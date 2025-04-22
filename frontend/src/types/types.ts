import { AxiosResponse } from "axios";

export interface TableData {
  _id: string;
  category: string;
  product: string | undefined;
  price: number | undefined;
  address: string | undefined;
  contact: string | undefined;
  isActive: boolean;
  saleDate: string;
}
type NewTableData = Omit<TableData, "_id">;

export interface PendingChange {
  id: string;
  category: string;
  key: keyof TableData;
  value: any;
}

export interface TotalData {
  categories: { category: string, total: number }[];
  _id: { year: number, month: number };
};

export interface DataWithClientKey extends TableData {
  clientKey: string;
}

export interface YearMonth {
  year: number;
  month: number;
}

export interface UseAppStore {
  table: string;
  setTable: (value: string) => void;

  tableData: DataWithClientKey[];
  setTableData: (value: DataWithClientKey[]) => void;
  addTableRow: (value: DataWithClientKey) => void;
  updateTableData: (id: string, key: keyof TableData, value: string | boolean | number) => void;

  pendingChanges: PendingChange[];
  queueChange: (change: PendingChange) => void;
  clearPendingChanges: () => void;
}

export interface ApiTypes {
  fetchData: ({ table, year, month }: { table: string, year: number, month: number }) => Promise<TableData[]>;
  fetchTotalData: () => Promise<any>;
  // fetchData: (param: Record<string, string>) => Promise<TableData[]>;
  fetchAddData: (newData: NewTableData) => Promise<AxiosResponse<{ _id: string }>>;
  fetchUpdateData: (updateData: TableData) => Promise<AxiosResponse>;
}