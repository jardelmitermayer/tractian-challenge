import { FC, useState } from "react";
import { Locations } from "../../types/type";
interface TreeNodeProps {
  node: Locations;
}

export const TreeLocation: FC<TreeNodeProps> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const toggle = () => {
    return (
      setIsExpanded(prevState => !prevState)
    )
  }

  return (
    <div className="tree-node">
      {node?.children &&
        <button className="toggle-icon" onClick={toggle}>
          {isExpanded ? "⮝" : "⮟"}
        </button>
      }
      <span>{node.name}</span>
      {isExpanded && node?.children && (node?.children.map(child => <TreeLocation node={child} />))}

    </div>
  );
};