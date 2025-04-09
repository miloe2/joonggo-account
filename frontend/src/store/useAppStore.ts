import { create } from "zustand";
import { UseAppStore } from "../types/types";

const useAppStore = create<UseAppStore>((set) => ({
  table: "매출",
  setTable: (value) =>
    set(() => {
      return { table: value };
    }),
  tableData: [
    // {
    //   "_id": "67cea30aaa6ee6cdcf10b5f3",
    //   "category": "매출",
    //   "product": "중고 맥북 판매",
    //   "price": 200,
    //   "address": "M1 맥북에어 판매합니다.",
    //   "contact": "010-1111-2222",
    //   "saleDate": "2025-03-15T00:00:00.000Z",
    //   "isActive": false
    // },
    // {
    //   "_id": "67cea30aaa6ee6ccf10b5f3",
    //   "category": "매출",
    //   "product": "중고 맥북 판매",
    //   "price": 200,
    //   "address": "M1 맥북에어 판매합니다.",
    //   "contact": "010-1111-2222",
    //   "saleDate": "2025-03-15T00:00:00.000Z",
    //   "isActive": false
    // },
    // {
    //   "_id": "67cea30aaa6ee6cdcf10bf3",
    //   "category": "매출",
    //   "product": "중고 맥북 판매",
    //   "price": 200,
    //   "address": "M1 맥북에어 판매합니다.",
    //   "contact": "010-1111-2222",
    //   "saleDate": "2025-03-15T00:00:00.000Z",
    //   "isActive": false
    // },
  ],
  setTableData: (newData) =>
    set(() => ({
      tableData: newData
    })),
  addTableRow: (dummy) =>
    set((state) => {
      console.log('zustand start')
      const newTableData = [...state.tableData, dummy]
      return {
        tableData: newTableData,
      };
    }),
  updateTableData: (id, key, value) =>
    set((state) => ({
      tableData: state.tableData.map((item) =>
        item._id === id ? { ...item, [key]: value } : item
      ),
    })),
  // isLoading: false,
  // setLoadingStatus: () =>
  //   set((state) => ({
  //     isLoading: !state.isLoading,
  //   })),
  // pathLoading: false,
  // setPathLoading: () =>
  //   set((state) => ({
  //     pathLoading: !state.pathLoading,
  //   })),
  // uuid: "",
  // setUUID: (value) =>
  //   set(() => {
  //     return { uuid: value };
  //   }),
}));

export default useAppStore;
