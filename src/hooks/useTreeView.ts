import Fuse from 'fuse.js';
import { useAssets } from "./useAssets";
import { Asset, Locations } from "../types/type";
import { useLocations } from "./useLocation";
import { useMemo } from "react";

export function useTreeView(companyId: string, isEnergySensorFilter: boolean, isCriticalFilter: boolean, searchTerm: string) {
  const { data: assets } = useAssets(companyId);
  const { data: locations } = useLocations(companyId);

  const treeView = useMemo(() => {
    if (!locations || !assets) return { asset: [], location: [] };

    const locationMap = new Map<string, Locations>();
    const subLocationMap = new Map<string, Locations[]>();
    const assetMap = new Map<string, Asset[]>();
    const subAssetMap = new Map<string, Asset[]>();
    const componentMap = new Map<string, Asset[]>();
    const unlinkedAssets: Asset[] = [];

    locations.forEach(location => {
      locationMap.set(location.id, location);
      if (location.parentId) {
        if (!subLocationMap.has(location.parentId)) {
          subLocationMap.set(location.parentId, []);
        }
        subLocationMap.get(location.parentId)!.push(location);
      }
    });

    assets.forEach(asset => {
      if (asset.sensorType) {
        if (!componentMap.has(asset.parentId || asset.locationId || 'root')) {
          componentMap.set(asset.parentId || asset.locationId || 'root', []);
        }
        componentMap.get(asset.parentId || asset.locationId || 'root')!.push(asset);
      } else if (asset.locationId) {
        if (!assetMap.has(asset.locationId)) {
          assetMap.set(asset.locationId, []);
        }
        assetMap.get(asset.locationId)!.push(asset);
      } else if (asset.parentId) {
        if (!subAssetMap.has(asset.parentId)) {
          subAssetMap.set(asset.parentId, []);
        }
        subAssetMap.get(asset.parentId)!.push(asset);
      } else {
        unlinkedAssets.push(asset);
      }
    });

    const checkAssetFilter = (asset: Asset): boolean => {
      if (isEnergySensorFilter && asset.status !== "operating") return false;
      if (isCriticalFilter && asset.status !== "alert") return false;
      return true;
    };

    const buildLocationTree = (location: Locations): Locations | null => {
      const filteredChildren = (subLocationMap.get(location.id) || [])
        .map(buildLocationTree)
        .filter(child => child !== null) as Locations[];

      const assetsInLocation = (assetMap.get(location.id) || [])
        .map(buildAssetTree)
        .filter(asset => asset !== null) as Asset[];

      const hasChildren = filteredChildren.length > 0 || assetsInLocation.length > 0;

      if (!isEnergySensorFilter && !isCriticalFilter) {
        location.children = [...filteredChildren, ...assetsInLocation];
        return location;
      }

      if (!hasChildren) return null;

      location.children = [...filteredChildren, ...assetsInLocation];
      return location;
    };

    const buildAssetTree = (asset: Asset): Asset | null => {
      const filteredChildren = (subAssetMap.get(asset.id) || [])
        .map(buildAssetTree)
        .filter(child => child !== null) as Asset[];

      const componentsInAsset = (componentMap.get(asset.id) || [])
        .filter(checkAssetFilter);

      const hasChildren = filteredChildren.length > 0 || componentsInAsset.length > 0;

      if (!isEnergySensorFilter && !isCriticalFilter) {
        asset.children = [...filteredChildren, ...componentsInAsset];
        return asset;
      }

      if (!checkAssetFilter(asset) && !hasChildren) return null;

      asset.children = [...filteredChildren, ...componentsInAsset];
      return asset;
    };

    const rootLocations = Array.from(locationMap.values())
      .filter(location => !location.parentId)
      .map(buildLocationTree)
      .filter(location => location !== null) as Locations[];

    const rootAssets = assets
      .filter(asset => !asset.locationId && !asset.parentId && asset.sensorType)
      .map(buildAssetTree)
      .filter(asset => asset !== null) as Asset[];

    const fuseOptions = {
      keys: ['name'],
      includeScore: true,
    };
    const fuseLocations = new Fuse(locations, fuseOptions);
    const fuseAssets = new Fuse(rootAssets, fuseOptions);

    const searchResultsLocations = searchTerm ? fuseLocations.search(searchTerm).map(result => result.item) : rootLocations;
    const searchResultsAssets = searchTerm ? fuseAssets.search(searchTerm).map(result => result.item) : rootAssets;

    return {
      location: searchResultsLocations,
      asset: searchResultsAssets,
    };
  }, [assets, locations, isEnergySensorFilter, isCriticalFilter, searchTerm]);

  return treeView;
}
