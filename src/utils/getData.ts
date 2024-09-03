import { Asset, Locations, TreeView } from "../types/type";

export async function fetchData(companyId: string): Promise<TreeView> {

  const treeView: TreeView = { asset: [], location: [] };

  const assetResponse = await fetch(`https://fake-api.tractian.com/companies/${companyId}/assets`);
  const assets: Asset[] = await assetResponse.json();

  assets.filter(asset => asset.sensorType && !asset.parentId && !asset.locationId).forEach((asset) => {
    treeView?.asset?.push(asset)
  });

  const locationsResponse = await fetch(`https://fake-api.tractian.com/companies/${companyId}/locations`);
  const locations: Locations[] = await locationsResponse.json();

  locations.filter(loc => !loc.parentId).forEach((location) => {
    treeView?.location?.push(recursiveLocation(location, locations, assets.map(asset => recursiveAsset(asset, assets))))
  });
  console.log(treeView)
  return treeView
}

function recursiveLocation(location: Locations, childrenLocations: Locations[], assets: Asset[]) {
  const children: Locations[] = [];
  childrenLocations.forEach(loc => {
    if (loc.parentId === location.id) {
      children.push(recursiveLocation(loc, childrenLocations, assets))
    }
  })
  const childrenAssets = assets.filter(asset => asset.locationId === location.id)
  location.children = [...children, ...childrenAssets]
  return location
}

function recursiveAsset(asset: Asset, childrenAssets: Asset[]) {
  const children: Asset[] = [];
  childrenAssets.forEach(childAsset => {
    if (childAsset.parentId === asset.id) {
      children.push(recursiveAsset(childAsset, childrenAssets))
    }
  })
  asset.children = [...children]
  return asset
}