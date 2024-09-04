import { FC, useCallback } from "react";
import { Asset, Component } from "../../types/type";

import './styles.css'
import { ComponentIcon } from "../icons/ComponentIcon";
import { GreenLighting } from "../icons/GreenLighting";
import { CriticalCircle } from "../icons/CriticalCircle";
interface ComponentDetailsProps {
  component: Component;
  onSelectMotor: (motor: Asset) => void;
}

export const ComponentDetails: FC<ComponentDetailsProps> = ({ component, onSelectMotor }) => {

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
    <button className="component-details" onClick={() => onSelectMotor(component)}>
      <ComponentIcon />
      <span>{component.name}</span>
      {renderComponentIcon()}
    </button>
  );
};
