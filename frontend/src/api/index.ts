import { ApiTypes } from "../types/types";
import api from "./apiClient";



// 모든 데이터 가져오기
export const fetchData: ApiTypes["fetchData"] = async ({ table, year, month }) => {
  try {
    const rsp = await api.get(`/api/sales`, {
      params: {
        category: table,
        year,
        month,
      },
    });
    // console.log("API Response:", rsp.data);
    return rsp.data;
  } catch (error) {
    console.error("오류 발생!", error);
  }
};

// 모든 통계 가져오기
export const fetchTotalData: ApiTypes["fetchTotalData"] = async () => {
  try {
    const rsp = await api.get(`/api/sales/total`);
    // console.log("API Response:", rsp.data);
    return rsp.data;
  } catch (error) {
    console.error("오류 발생!", error);
  }
};


// 데이터 추가하기
export const fetchAddData: ApiTypes["fetchAddData"] = async (newData) => {
  try {
    const rsp = await api.post(`/api/sales`, newData);
    // console.log("API Response:", rsp.data);
    return rsp;
  } catch (error) {
    console.error("오류 발생!", error);
    throw error;
  }
};

// 데이터 업데이트
export const fetchUpdateData: ApiTypes["fetchUpdateData"] = async (rawData) => {
  const { _id, ...others } = rawData;
  const updateData = {
    id: _id,
    ...others
  };

  try {
    const rsp = await api.put(`/api/sales`, updateData);
    // console.log("API Response:", rsp);
    return rsp;
  } catch (error) {
    console.error("오류 발생!", error);
    throw error;
  }
};
