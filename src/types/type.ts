import { Dispatch } from "react";

export interface Company {
  id: string;
  name: string;
}
export interface Component {
  name: string
}
export interface Asset {
  id: string;
  name: string;
  locationId?: string;
  parentId?: string;
  sensorId?: string;
  sensorType?: string;
  gatewayId?: string;
  children?: Asset[] | Component[];
}

export interface Locations {
  id: string;
  name: string;
  parentId?: string;
  children?: Locations[] | Asset[];
}

export interface TreeView {
  location?: Locations[]
  asset?: Asset[]
}

export type TreeNode = Locations | Asset

export type TreeAction =
  | { type: "INIT_DATA"; data: TreeView }
  | { type: "TOGGLE_NODE"; id: string; isExpanded: boolean }

export interface TreeStateContextProps {
  state: TreeView;
  dispatch: Dispatch<TreeAction>;
}