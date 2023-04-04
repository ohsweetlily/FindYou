interface GraphData {
  lost: number;
  getBack: number;
}

export interface Monthly extends GraphData {
  month: string;
}

export interface ByPlace extends GraphData {
  place: string;
}

export interface ByCategory extends GraphData {
  category: string;
}

export interface TotalData {
  name: "lost" | "getBack";
  value: number;
}
