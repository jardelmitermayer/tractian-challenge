import { useQuery } from "@tanstack/react-query";
import { Company } from "../types/type";

const fetchCompanies = async (): Promise<Company[]> => {
  const response = await fetch('https://fake-api.tractian.com/companies');
  const data = await response.json();
  return data
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });
};