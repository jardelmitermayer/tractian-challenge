import { useQuery } from "@tanstack/react-query";
import { Asset } from "../types/type";

const fetchAssets = async (companyId: string): Promise<Asset[]> => {
  const response = await fetch(`https://fake-api.tractian.com/companies/${companyId}/assets`);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }
  const assets: Asset[] = await response.json();
  return assets;
};

export const useAssets = (companyId: string) => {
  return useQuery({
    queryKey: ['assets', companyId],
    queryFn: () => fetchAssets(companyId),
  });
};
