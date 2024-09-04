import { useQuery } from "@tanstack/react-query";
import { Locations } from "../types/type";

const fetchLocations = async (companyId: string): Promise<Locations[]> => {
  const response = await fetch(`https://fake-api.tractian.com/companies/${companyId}/locations`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  const locations: Locations[] = await response.json();
  return locations;
};

export const useLocations = (companyId: string) => {
  return useQuery({
    queryKey: ['locations', companyId],
    queryFn: () => fetchLocations(companyId),
  });
};
