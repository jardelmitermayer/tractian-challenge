import { FC } from "react";
import { Component } from "../../types/type";

interface ComponentDetailsProps {
  component: Component;
}

export const ComponentDetails: FC<ComponentDetailsProps> = ({ component }) => {
  return (
    <div>
      <p>{component.name}</p>
    </div>
  );
};
