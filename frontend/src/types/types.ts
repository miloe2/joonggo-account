export interface TableData {
  _id: string;
  category: string;
  product: string;
  price: number;
  address: string;
  contact: string;
  isActive:  boolean;
  saleDate: string;
}

export interface UseAppStore {
  table: string;
  setTable: (value: string) => void;
  // isLoading: boolean;
  // setLoadingStatus: () => void;
  // pathLoading: boolean;
  // setPathLoading: () => void;
  // uuid: string;
  // setUUID: (value: string) => void;
}
