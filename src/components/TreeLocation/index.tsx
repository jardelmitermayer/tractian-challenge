import { FC, useState, memo, useCallback } from "react";
import { Asset, Locations } from "../../types/type";
import { AssetIcon } from "../icons/AssetIcon";
import { ComponentIcon } from "../icons/ComponentIcon";
import { LocationIcon } from "../icons/LocationIcon";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { CriticalCircle } from "../icons/CriticalCircle";
import { GreenLighting } from "../icons/GreenLighting";

import './styles.css';

type TreeNodeProps = {
  node: Locations | Asset;
  onSelectMotor: (motor: Asset) => void;
};

export const TreeLocation: FC<TreeNodeProps> = memo(({ node, onSelectMotor }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (node?.children && node.children.length > 0) {
      setIsExpanded(prevState => !prevState);
    }
    if ('sensorType' in node && node.sensorType) {
      onSelectMotor(node);
    }
  }, [node, onSelectMotor]);

  const renderIcon = useCallback(() => {
    if ('sensorType' in node && node.sensorType) {
      return <ComponentIcon />;
    } else if ('locationId' in node && node.locationId) {
      return <AssetIcon />;
    } else if ('locationId' in node && !node.locationId && node.parentId) {
      return <AssetIcon />;
    } else {
      return <LocationIcon />;
    }
  }, [node]);

  const renderComponentIcon = useCallback(() => {
    if ('status' in node && node.status) {
      if (node.status === "operating") {
        return <GreenLighting />;
      } else if (node.status === "alert") {
        return <CriticalCircle />;
      }
    }
    return null;
  }, [node]);

  return (
    <div className="tree-node">
      <button className="container" onClick={handleClick}>
        {node?.children && node.children.length > 0 && (
          <span className="toggle-icon">
            {isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </span>
        )}
        {renderIcon()}
        <span>{node.name}</span>
        {renderComponentIcon()}
      </button>
      {isExpanded && node?.children && node.children.length > 0 && (
        <div className="children">
          {node.children.map(child => (
            <TreeLocation
              key={child.id}
              node={child}
              onSelectMotor={onSelectMotor}
            />
          ))}
        </div>
      )}
    </div>
  );
});
