export interface RouteI {
  begin: string;
  end: string;
  cost: number;
  id: string;
}
export interface RouteTable {
  [key: string]: {
    [key: string]: number;
  };
}
export interface RouteTree {
  route: string[];
  cost: number;
  routes: RouteTree[];
  ids: {
    [key: string]: number;
  };
}
export interface RouteResult {
  route: string[];
  cost: number;
}

export interface TabPanelProps {
  routes: RouteI[];
  letters: string[];
  table: RouteTable;
}
