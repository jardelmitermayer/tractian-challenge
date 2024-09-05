import { FC, useCallback } from "react";

import { ComponentIcon } from "../icons/ComponentIcon";
import { GreenLighting } from "../icons/GreenLighting";
import { CriticalCircle } from "../icons/CriticalCircle";
import { Asset, Component } from "../../types/type";

import './styles.css'
interface ComponentItemProps {
  component: Component;
  onSelectComponent: (motor: Asset) => void;
}

export const ComponentItem: FC<ComponentItemProps> = ({ component, onSelectComponent }) => {

  const renderComponentIcon = useCallback(() => {
    if (component.status === "operating") {
      return <GreenLighting />
    } else if (component.status === "alert") {
      return <CriticalCircle />
    } else {
      return null
    }
  }, [component])

  return (
    <button className="component-item" onClick={() => onSelectComponent(component)}>
      <ComponentIcon />
      <span>{component.name}</span>
      {renderComponentIcon()}
    </button>
  );
};
