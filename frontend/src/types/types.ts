import { AxiosResponse } from "axios";

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
type NewTableData = Omit<TableData, "_id">;

export interface PendingChange {
  id: string;
  key: keyof TableData;
  value: any;
}

export interface UseAppStore {
  table: string;
  setTable: (value: string) => void;

  tableData: TableData[];
  setTableData: (value: TableData[]) => void;
  addTableRow: (value: TableData) => void;
  updateTableData: (id: string, key: keyof TableData, value: string | boolean | number) => void;

  pendingChanges: PendingChange[];
  queueChange: (change: PendingChange) => void;
  clearPendingChanges: () => void;
}

export interface ApiTypes {
  fetchData: (table: string) => Promise<TableData[]>;
  fetchAddData: (newData: NewTableData) => Promise<AxiosResponse<{ _id: string }>>;
  fetchUpdateData: (updateData: TableData) => Promise<AxiosResponse>;
}