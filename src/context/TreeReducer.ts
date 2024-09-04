import { TreeAction, TreeView } from "../types/type";
import { toggleNode } from "./utils/toggleNode";

export const treeReducer = (state: TreeView, action: TreeAction): TreeView => {
  switch (action.type) {
    case "INIT_DATA":
      return action.data;
    case "TOGGLE_NODE":
      return toggleNode(state, action.id, action.isExpanded);
    default:
      return state;
  }
};