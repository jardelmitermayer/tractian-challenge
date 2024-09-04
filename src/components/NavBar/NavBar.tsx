import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompanies } from '../../hooks/useCompanies';
import './Navbar.css'
import { Logo } from '../Logo';
import { GoldIcon } from '../Icons/GoldIcon';

export const NavBar: FC = () => {
  const { data: companies, isLoading, error } = useCompanies();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (companies && !selectedCompanyId) {
      const firstCompanyId = companies[0].id;
      setSelectedCompanyId(firstCompanyId);
      navigate(`/company/${firstCompanyId}`);
    }
  }, [companies, selectedCompanyId, navigate]);

  const handleCompanyClick = (companyId: string) => {
    setSelectedCompanyId(companyId);
    navigate(`/company/${companyId}`);
  };

  return (
    <nav className="navbar">
      <Logo />
      {isLoading && <p>Loading...</p>}
      {error && <p>Erro ao carregar empresas</p>}
      {companies && (
        <ul className="navbar-list">
          {companies.map((company) => (
            <li key={company.id} className="navbar-item">
              <button
                onClick={() => handleCompanyClick(company.id)}
                className={`navbar-link ${selectedCompanyId === company.id ? 'active' : ''}`}
              >
                <GoldIcon />
                {company.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
