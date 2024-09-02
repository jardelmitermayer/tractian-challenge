export async function fetchData(companyId: string) {
  const locationsResponse = await fetch(`https://fake-api.tractian.com/companies/${companyId}/locations`);
  const assetsResponse = await fetch(`https://fake-api.tractian.com/companies/${companyId}/assets`);

  const locations = await locationsResponse.json();
  const assets = await assetsResponse.json();
  const locationMap = new Map<string, any>();
  locations.forEach((location: any) => locationMap.set(location.id, { ...location, children: [] }));


  const assetMap = new Map<string, any>();
  assets.forEach((asset: any) => assetMap.set(asset.id, { ...asset, children: [] }));


  assets.forEach((asset: any) => {
    if (asset.locationId) {
      const location = locationMap.get(asset.locationId);
      if (location) {
        location.children.push(asset);
      }
    } else if (asset.parentId) {
      const parentAsset = assetMap.get(asset.parentId);
      if (parentAsset) {
        parentAsset.children.push(asset);
      }
    }
  });


  locations.forEach((location: any) => {
    if (location.parentId) {
      const parentLocation = locationMap.get(location.parentId);
      if (parentLocation) {
        parentLocation.children.push(location);
      }
    }
  });

  const rootNodes = Array.from(locationMap.values()).filter((node: any) => !node.parentId);
console.log(rootNodes)
  return rootNodes;
}
