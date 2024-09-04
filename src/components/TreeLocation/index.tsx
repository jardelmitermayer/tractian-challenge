import { FC, useState, memo, useCallback } from "react";
import { Asset, Locations } from "../../types/type";
import { AssetIcon } from "../icons/AssetIcon";
import { ComponentIcon } from "../icons/ComponentIcon";
import { LocationIcon } from "../icons/LocationIcon";

import './styles.css';
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { CriticalCircle } from "../icons/CriticalCircle";
import { GreenLighting } from "../icons/GreenLighting";

type TreeNodeProps = {
  node: Locations | Asset;
  onSelectMotor: (motor: Asset) => void;
};

export const TreeLocation: FC<TreeNodeProps> = memo(({ node, onSelectMotor }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setIsExpanded(prevState => !prevState);
  }, []);

  const handleSelect = () => {
    if ('sensorType' in node && node.sensorType) {
      onSelectMotor(node);
    }
  };

  const renderIcon = useCallback(() => {
    if ('locationId' in node && node.locationId) {
      return <AssetIcon />;
    } else if ('sensorType' in node && node.sensorType) {
      return <ComponentIcon />;
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
      <div className="container" onClick={handleSelect}>
        {node?.children && node.children.length > 0 && (
          <button className="toggle-icon" onClick={toggle}>
            {isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </button>
        )}
        {renderIcon()}
        <span>{node.name}</span>
        {renderComponentIcon()}
      </div>
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
