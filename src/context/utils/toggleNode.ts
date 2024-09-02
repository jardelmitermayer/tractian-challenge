import { TreeNode } from "../../types/type";

export const toggleNode = (nodes: TreeNode[], id: string, expanded: boolean): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, isExpanded: expanded };
    }
    if (node.parentId) {
      return { ...node, assets: toggleNode(node.assets, id, expanded) };
    }
    return node;
  });
};