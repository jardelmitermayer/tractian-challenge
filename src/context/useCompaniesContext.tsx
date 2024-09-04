import { useContext } from "react";
import { CompaniesContext } from "./CompaniesProvider";
import { CompaniesContextType } from "../types/type";

export const useCompaniesContext = (): CompaniesContextType => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error('useCompaniesContext must be used within a CompaniesProvider');
  }
  return context;
};