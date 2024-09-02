import { FC } from "react";
import { Asset, Locations } from "../../types/type";
import { TreeNode } from "../TreeNode";

export const TreeView: FC<{ data: (Locations | Asset)[] }> = ({ data }) => {
  return (
    <div className="tree-view">
      {data?.map(node => <TreeNode key={node.id} node={node} />)}
    </div>
  );
};