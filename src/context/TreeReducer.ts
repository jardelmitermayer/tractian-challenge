import { TreeNode, TreeAction } from "../types/type";
import { toggleNode } from "./utils/toggleNode";


export const treeReducer = (state: TreeNode[], action: TreeAction): TreeNode[] => {
  switch (action.type) {
    case "INIT_DATA":
      return action.data;
    case "TOGGLE_NODE":
      return toggleNode(state, action.id, action.isExpanded);
    default:
      return state;
  }
};