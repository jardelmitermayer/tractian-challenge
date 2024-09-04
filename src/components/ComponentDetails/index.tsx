import { FC } from "react";
import { Component } from "../../types/type";

import './styles.css'
import { ComponentIcon } from "../Icons/ComponentIcon";
interface ComponentDetailsProps {
  component: Component;
}

export const ComponentDetails: FC<ComponentDetailsProps> = ({ component }) => {
  return (
    <div className="component-details">
      <ComponentIcon />
      <span className="name">{component.name}</span>
    </div>
  );
};
