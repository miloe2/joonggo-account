export interface TableData {
  _id: string;
  category: string;
  product: string;
  price: number;
  address: string;
  contact: string;
  isActive: boolean;
  saleDate: string;
}

export interface UseAppStore {
  table: string;
  setTable: (value: string) => void;
  tableData: TableData[];
  setTableData: (value: TableData[]) => void;
  addTableRow: (value: TableData) => void;
  updateTableData: (id: string, key: keyof TableData, value: string | boolean | number) => void;
}

export interface ApiTypes {
  fetchData: (table: string) => Promise<TableData[]>;
}