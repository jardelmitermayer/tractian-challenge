import { Dispatch } from "react";

export interface Asset {
  id: string;
  name: string;
  locationId?: string;
  parentId?: string;
  sensorId?: string;
  sensorType?: string;
  gatewayId?: string;
  isExpanded?: boolean;
}

export interface Locations {
  id: string;
  name: string;
  parentId?: string;
  isExpanded?: boolean;
}

export type TreeNode = Locations | Asset

export type TreeAction =
  | { type: "INIT_DATA"; data: TreeNode[] }
  | { type: "TOGGLE_NODE"; id: string; isExpanded: boolean }

export interface TreeStateContextProps {
  state: TreeNode[];
  dispatch: Dispatch<TreeAction>;
}