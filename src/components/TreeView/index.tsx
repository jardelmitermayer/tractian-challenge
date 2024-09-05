import { FC, useState } from "react";


import { ComponentItem } from "../ComponentItem";
import { SearchFilter } from "../SearchFilter";
import { TreeNode } from "../TreeNode";
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
  const [selectedComponent, setSelectedComponent] = useState<Asset | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const data = useTreeView(companyId, isEnergySensorFilter, isCriticalFilter, searchTerm);

  const handleSelectMotor = (motor: Asset) => {
    setSelectedComponent(motor);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  }
  const handleSearchClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="container-tree-view">
      <div className="filter-and-tree">
        <SearchFilter searchTerm={searchTerm} onSearch={handleSearch} onClear={handleSearchClear} />
        <div className="tree-view">
          {data.location && data.location.map(node => (
            <TreeNode
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
        {selectedComponent ? (
          <ComponentDetails component={selectedComponent} />
        ) : (
          <div className="without-component">
            Selecione um componente para visualizar seus detalhes
          </div>
        )}
      </div>
    </div>
  );
};
