import { FC } from "react";
import { TreeLocation } from "../TreeLocation";
import { ComponentDetails } from "../ComponentDetails";
import { useTreeView } from "../../hooks/useTreeView";

interface TreeViewProps {
  companyId: string
}

export const TreeView: FC<TreeViewProps> = ({ companyId }) => {

  const data = useTreeView(companyId)
  return (
    <div className="tree-view">
      {data.location && data.location.map(node => {
        return (
          <TreeLocation
            key={node.id}
            node={node}
          />
        )
      })}
      {data.asset && data.asset.map(node => {
        if (node.sensorType) {
          return (
            <ComponentDetails key={node.id} component={node} />
          )
        }
        return null
      })}
    </div>
  );
};