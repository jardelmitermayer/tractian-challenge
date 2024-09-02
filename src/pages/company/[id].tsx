import { useParams } from 'react-router-dom';

export const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Company ID: {id}</h1>
    </div>
  );
};
