import { useParams } from 'react-router-dom';
import { TreeFiltersAndActions } from '../../components/TreeFiltersAndActions';
import { TreeView } from '../../components/TreeView';

import './companyPage.css'

export const CompanyPage = () => {
  const { id: companyId } = useParams<{ id: string }>();
  return (
    <div className='company-page'>
      <div className='flex'>
        <h2>Ativos</h2>
        <h4>/Local</h4>
      </div>
      <TreeFiltersAndActions />
      {companyId && <TreeView companyId={companyId} />}
    </div>
  );
};
