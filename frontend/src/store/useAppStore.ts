import { create } from "zustand";
import { UseAppStore } from "../types/types";

const useAppStore = create<UseAppStore>((set) => ({
  table: "매출",
  setTable: (value) =>
    set(() => {
      return { table: value };
    }),
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
