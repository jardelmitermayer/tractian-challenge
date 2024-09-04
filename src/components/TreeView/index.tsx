import { FC, useState } from "react";
import { TreeLocation } from "../TreeLocation";
import { MotorDetails } from "../MotorDetails";
import { useTreeView } from "../../hooks/useTreeView";
import { Asset } from "../../types/type";

import './styles.css'
interface TreeViewProps {
  companyId: string;
}

export const TreeView: FC<TreeViewProps> = ({ companyId }) => {
  const [selectedMotor, setSelectedMotor] = useState<Asset | null>(null); // Estado para o motor selecionado
  const data = useTreeView(companyId);

  const handleSelectMotor = (motor: Asset) => {
    setSelectedMotor(motor);
  };

  return (
    <div className="container-tree-view">
      <div className="tree-view">
        {data.location && data.location.map(node => (
          <TreeLocation
            key={node.id}
            node={node}
            onSelectMotor={handleSelectMotor} // Propagando para os filhos
          />
        ))}
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
