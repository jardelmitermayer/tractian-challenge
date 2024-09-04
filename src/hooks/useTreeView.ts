import { useAssets } from "./useAssets";
import { Asset, Locations } from "../types/type";
import { useLocations } from "./useLocation";
import { useMemo } from "react";

export function useTreeView(companyId: string) {
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
        // Se o item é um asset dentro de uma localização
        if (!assetMap.has(asset.locationId)) {
          assetMap.set(asset.locationId, []);
        }
        assetMap.get(asset.locationId)!.push(asset);
      } else if (asset.parentId) {
        // Se o item é um asset dentro de outro asset
        if (!subAssetMap.has(asset.parentId)) {
          subAssetMap.set(asset.parentId, []);
        }
        subAssetMap.get(asset.parentId)!.push(asset);
      } else {
        // Se o item não está vinculado a nada
        unlinkedAssets.push(asset);
      }
    });

    // Função para construir a árvore de localizações
    const buildLocationTree = (location: Locations): Locations => {
      // Adicionar sub-localizações
      location.children = subLocationMap.get(location.id)?.map(buildLocationTree) || [];

      // Adicionar assets dentro da localização
      const assetsInLocation = assetMap.get(location.id) || [];
      location.children.push(...assetsInLocation.map(buildAssetTree));

      return location;
    };


    const buildAssetTree = (asset: Asset): Asset => {

      asset.children = subAssetMap.get(asset.id)?.map(buildAssetTree) || [];

      const componentsInAsset = componentMap.get(asset.id) || [];
      asset.children.push(...componentsInAsset);

      return asset;
    };

    // Constrói a árvore de localizações a partir das localizações raiz
    const rootLocations = Array.from(locationMap.values())
      .filter(location => !location.parentId)
      .map(buildLocationTree);

    const rootAssets = assets.filter(asset => !asset.locationId && !asset.parentId && asset.sensorType);

    return {
      location: rootLocations,
      asset: [...rootAssets],
    };
  }, [assets, locations]);

  console.log(treeView)
  return treeView;
}
