import { createContext, ReactNode } from 'react';
import { useCompanies } from '../hooks/useCompanies'; // Importando o hook existente
import { CompaniesContextType } from '../types/type';

export const CompaniesContext = createContext<CompaniesContextType | undefined>(undefined);

export const CompaniesProvider = ({ children }: { children: ReactNode }) => {
  const { data: companies } = useCompanies();

  return (
    <CompaniesContext.Provider value={{ companies }}>
      {children}
    </CompaniesContext.Provider>
  );
};
