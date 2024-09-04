import { useParams } from 'react-router-dom';
import { TreeFiltersAndActions } from '../../components/TreeFiltersAndActions';
import { TreeView } from '../../components/TreeView';
import { ExclamationIcon } from '../../components/icons/ExclamationIcon';
import { ThunderBoltIcon } from '../../components/icons/ThunderBoltIcon';

import './companyPage.css'
import { useState } from 'react';
import { useCompaniesContext } from '../../context/useCompaniesContext';

export const CompanyPage = () => {
  const { id: companyId } = useParams<{ id: string }>();
  const { companies } = useCompaniesContext();
  const [isEnergySensorFilter, setIsEnergySensorFilter] = useState<boolean>(false);
  const [isCriticalFilter, setIsCriticalFilter] = useState<boolean>(false);

  const companyName = companies?.find(company => company.id === companyId)?.name;
  const toggleEnergySensorFilter = () => setIsEnergySensorFilter(prev => !prev);
  const toggleCriticalFilter = () => setIsCriticalFilter(prev => !prev);

  return (
    <div className='company-page'>
      <div className='company-page-filters'>
        <span className='active-local'><h2>Ativos</h2>/ {companyName}</span>
        <div className='filter-buttons-container'>
          <button
            className={`filter-button ${isEnergySensorFilter && 'filter-button-active'} `}
            onClick={toggleEnergySensorFilter}
          >
            <ThunderBoltIcon isActive={isEnergySensorFilter} />
            Sensor de Energia
          </button>
          <button
            className={`filter-button ${isCriticalFilter && 'filter-button-active'} `}
            onClick={toggleCriticalFilter}
          >
            <ExclamationIcon isActive={isCriticalFilter} />
            Crítico
          </button>
        </div>
      </div>
      <TreeFiltersAndActions />
      {companyId && (
        <TreeView
          companyId={companyId}
          isEnergySensorFilter={isEnergySensorFilter}
          isCriticalFilter={isCriticalFilter}
        />
      )}
    </div>
  );
};
