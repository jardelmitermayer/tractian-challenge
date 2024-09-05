import { FC, useCallback, useState } from 'react';
import { Asset } from '../../types/type';
import './styles.css';
import { CriticalCircle } from '../icons/CriticalCircle';
import { GreenLighting } from '../icons/GreenLighting';
import { SensorIcon } from '../icons/SensorIcon';
import { ReceiverIcon } from '../icons/ReceiverIcon';

import motor from "../../assets/motor.png"
interface ComponentDetailsProps {
  component: Asset;
}

export const ComponentDetails: FC<ComponentDetailsProps> = ({ component }) => {
  const [showImage, setShowImage] = useState<boolean>(false);

  const renderComponentIcon = useCallback(() => {
    if (component.status === "operating") {
      return <GreenLighting />;
    } else if (component.status === "alert") {
      return <CriticalCircle />;
    }
  }, [component]);

  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  console.log(component)
  return (
    <div className="component-details">
      <div className="title-status">
        <h2>{component.name}</h2>
        {renderComponentIcon()}
      </div>

      <div className="component-info">
        <div className="photo-type-owner">
          {showImage ?
            <img
              className="component-image"
              src={motor}
              alt="component-example"
              onClick={() => setShowImage(prevState => !prevState)}
            />
            : <div
              className="component-image-placeholder"
              onClick={() => setShowImage(prevState => !prevState)}>
              Adicionar imagem do Ativo
            </div>
          }

          <div className="type-owner">
            <strong>Tipo de Equipamento</strong>
            <p> Motor Elétrico (Trifásico)</p>
            <strong>Responsáveis</strong>
            <div className="responsaveis">
              <div className="avatar">
                {getFirstLetter('Elétrica')}
              </div>
              <p>Eletrica</p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className='sensor-receiver'>
          <div>
            <strong>Sensor</strong>
            <div className="icon-sensor-id">
              <SensorIcon />
              <p> {component.sensorId}</p>
            </div>
          </div>
          <div>
            <strong>Receptor</strong>
            <div className="icon-sensor-id">
              <ReceiverIcon />
              <p>{component.gatewayId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
