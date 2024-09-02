import { FC } from "react";
import { TreeView } from "../TreeView";
import { Locations, Asset } from "../../types/type";
import { useTreeState } from "../../context/useTreeState";


interface TreeNodeProps {
  node: Locations | Asset;
}

export const TreeNode: FC<TreeNodeProps> = ({ node }) => {
  const { dispatch } = useTreeState();

  const toggle = () => {
    dispatch({
      type: 'TOGGLE_NODE',
      id: node.id,
      isExpanded: !node.isExpanded
    });
  };

  return (
    <div className="tree-node">
      {node.child &&
        <button className="toggle-icon" onClick={toggle}>
          {node.isExpanded ? "⮝" : "⮟"}
        </button>}
      <span>{node.name}</span>
      {node.isExpanded && node.assets && <TreeView data={node.assets} />}
      {node.components && node.isExpanded && (
        <div className="components-view">
          {node.components.map(component => (
            <div key={component.id} className="component-node">
              {component.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};