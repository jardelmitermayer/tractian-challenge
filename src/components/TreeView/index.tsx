import { FC, useState } from "react";


import { ComponentItem } from "../ComponentItem";
import { SearchFilter } from "../SearchFilter";
import { TreeLocation } from "../TreeLocation";
import { ComponentDetails } from "../ComponentDetails";
import { useTreeView } from "../../hooks/useTreeView";
import { Asset } from "../../types/type";

import './styles.css'
interface TreeViewProps {
  companyId: string;
  isEnergySensorFilter: boolean;
  isCriticalFilter: boolean;
}

export const TreeView: FC<TreeViewProps> = ({ companyId, isEnergySensorFilter, isCriticalFilter }) => {
  const [selectedMotor, setSelectedMotor] = useState<Asset | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const data = useTreeView(companyId, isEnergySensorFilter, isCriticalFilter, searchTerm);

  const handleSelectMotor = (motor: Asset) => {
    setSelectedMotor(motor);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="container-tree-view">
      <div className="filter-and-tree">
        <SearchFilter onSearch={handleSearch} />
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
                <ComponentItem key={node.id} component={node} onSelectComponent={handleSelectMotor} />
              )
            }
            return null
          })}
        </div>
      </div>
      <div className="details-panel">
        {selectedMotor ? (
          <ComponentDetails component={selectedMotor} />
        ) : (
          <div>Selecione um motor para ver os detalhes</div>
        )}
      </div>
    </div>
  );
};
