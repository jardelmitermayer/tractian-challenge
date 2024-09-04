export interface Company {
  id: string;
  name: string;
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
  status?: string;
}

export type Component = Omit<Asset, "children">;

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

export interface CompaniesContextType {
  companies: Company[] | undefined;
}