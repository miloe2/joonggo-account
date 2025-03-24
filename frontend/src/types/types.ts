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
  tableData: TableData[];
  setTableData: (id: string, key: keyof TableData, value: string | boolean | number) => void;
}
