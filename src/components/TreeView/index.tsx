import { FC } from "react";
import { TreeView as ITreeView } from "../../types/type";
import { TreeLocation } from "../TreeLocation";
import { Component } from "../Component";

export const TreeView: FC<{ data: ITreeView }> = ({ data }) => {
  return (
    <div className="tree-view">
      {data.location && data.location.map(node => {
        return (
          <TreeLocation
            key={node.id}
            node={node}
          />
        )
      })}
      {data.asset && data.asset.map(node => {
        if (node.sensorType) {
          return (
            <Component />
          )
        }
        return null
      })}
    </div>
  );
};