import { FC, useState } from "react";
import { TreeLocation } from "../TreeLocation";
import { MotorDetails } from "../MotorDetails";
import { useTreeView } from "../../hooks/useTreeView";
import { Asset } from "../../types/type";

import './styles.css'
import { ComponentDetails } from "../ComponentDetails";
import { TreeFiltersAndActions } from "../TreeFiltersAndActions";
interface TreeViewProps {
  companyId: string;
  isEnergySensorFilter: boolean;
  isCriticalFilter: boolean;
}

export const TreeView: FC<TreeViewProps> = ({ companyId, isEnergySensorFilter, isCriticalFilter }) => {
  const [selectedMotor, setSelectedMotor] = useState<Asset | null>(null); // Estado para o motor selecionado
  const data = useTreeView(companyId, isEnergySensorFilter, isCriticalFilter);

  const handleSelectMotor = (motor: Asset) => {
    setSelectedMotor(motor);
  };

  return (
    <div className="container-tree-view">
      <div className="filter-and-tree">
        <TreeFiltersAndActions />
        <div className="tree-view">
          {data.location && data.location.map(node => (
            <TreeLocation
              key={node.id}
              node={node}
              onSelectMotor={handleSelectMotor}
            />
          ))}
          {data.asset && data.asset.map(node => {
            if (node.sensorType) {
              return (
                <ComponentDetails key={node.id} component={node} onSelectMotor={handleSelectMotor} />
              )
            }
            return null
          })}
        </div>
      </div>
      <div className="details-panel">
        {selectedMotor ? (
          <MotorDetails motor={selectedMotor} />
        ) : (
          <div>Selecione um motor para ver os detalhes</div>
        )}
      </div>
    </div>
  );
};
