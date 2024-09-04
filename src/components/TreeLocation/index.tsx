import { FC, useState, memo, useCallback } from "react";
import { Asset, Locations } from "../../types/type";
import { AssetIcon } from "../Icons/AssetIcon";
import { ComponentIcon } from "../Icons/ComponentIcon";
import { LocationIcon } from "../Icons/LocationIcon";

import './styles.css';
import { ArrowDownIcon } from "../Icons/ArrowDownIcon";
import { ArrowUpIcon } from "../Icons/ArrowUpIcon";

type TreeNodeProps = {
  node: Locations | Asset;
};

export const TreeLocation: FC<TreeNodeProps> = memo(({ node }) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setIsExpanded(prevState => !prevState);
  }, []);

  const renderIcon = useCallback(() => {
    if ('locationId' in node && node.locationId) {
      return <AssetIcon />;
    } else if ('sensorType' in node && node.sensorType) {
      return <ComponentIcon />;
    } else {
      return <LocationIcon />;
    }
  }, [node]);

  return (
    <div className="tree-node">
      <div className="container">
        {node?.children && node.children.length > 0 && (
          <button className="toggle-icon" onClick={toggle}>
            {isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </button>
        )}
        {renderIcon()}
        <span>{node.name}</span>
      </div>
      {isExpanded && node?.children && node.children.length > 0 && (
        <div className="children">
          {node.children.map(child => (
            <TreeLocation key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
});
