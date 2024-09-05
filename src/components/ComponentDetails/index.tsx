import { FC, useCallback } from 'react';
import { Asset } from '../../types/type';
import './styles.css';
import { CriticalCircle } from '../icons/CriticalCircle';
import { GreenLighting } from '../icons/GreenLighting';

interface ComponentDetailsProps {
  component: Asset;
}

export const ComponentDetails: FC<ComponentDetailsProps> = ({ component }) => {
  const renderComponentIcon = useCallback(() => {
    if (component.status === "operating") {
      return <GreenLighting />;
    } else if (component.status === "alert") {
      return <CriticalCircle />;
    }
  }, [component]);
  return (
    <div className="component-details">
      <div className="title-status">
        <h2>{component.name}</h2>
        {renderComponentIcon()}
      </div>

      <div className="component-info">
        <div className="photo-type-owner">
          <div className="component-image-placeholder">Adicionar imagem do Ativo</div>
          <div className="type-owner">
            <p><strong>Tipo de Equipamento:</strong> {component.sensorType}</p>
            <p><strong>Responsáveis:</strong> Eletrica</p>
          </div>
        </div>

        <p><strong>Sensor:</strong> {component.sensorId}</p>
        <p><strong>Receptor:</strong> {component.gatewayId}</p>
      </div>
    </div>
  );
};
