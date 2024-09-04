import { FC } from 'react';
import { Asset } from '../../types/type';
import './styles.css';

interface MotorDetailsProps {
  motor: Asset;
}

export const MotorDetails: FC<MotorDetailsProps> = ({ motor }) => {
  return (
    <div className="motor-details">
      <h2>{motor.name}</h2>
      {/* <img src={motor.imageUrl} alt={motor.name} className="motor-image" /> */}
      <div className="motor-info">
        <p><strong>Tipo de Equipamento:</strong> {motor.sensorType}</p>
        <p><strong>Responsáveis:</strong> Eletrica</p>
        <p><strong>Sensor:</strong> {motor.sensorId}</p>
        <p><strong>Receptor:</strong> {motor.gatewayId}</p>
      </div>
    </div>
  );
};
