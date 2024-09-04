import { FC, useState } from "react";
import { Asset, Locations } from "../../types/type";
import { AssetIcon } from "../Icons/AssetIcon";
import { ComponentIcon } from "../Icons/ComponentIcon";
import { LocationIcon } from "../Icons/LocationIcon";

import './styles.css'

type TreeNodeProps = {
  node: Locations | Asset;
}

export const TreeLocation: FC<TreeNodeProps> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const toggle = () => {
    return (
      setIsExpanded(prevState => !prevState)
    )
  }
  const renderIcon = () => {
    if ('locationId' in node && node.locationId) {
      return <AssetIcon />;
    } else if ('sensorType' in node && node.sensorType) {
      return <ComponentIcon />;
    } else {
      return <LocationIcon />;
    }
  };

  return (
    <div className="tree-node">
      <div className="container">
        {node?.children &&
          <button className="toggle-icon" onClick={toggle}>
            {isExpanded ? "↑" : "↓"}
          </button>
        }
        {renderIcon()}
        <span>{node.name}</span>
      </div>
      {isExpanded && node?.children && (node?.children.map(child => <TreeLocation node={child} />))}

    </div>
  );
};