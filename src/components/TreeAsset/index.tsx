import { FC, useState } from "react";
import { Asset } from "../../types/type";

interface TreeAssetProps {
  node: Asset;
}

export const TreeAsset: FC<TreeAssetProps> = ({ node }) => {
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
      {isExpanded && node?.children && (node?.children.map(child => <TreeAsset node={child} />))}

    </div>
  );
};