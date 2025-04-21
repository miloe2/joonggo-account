import axios from "axios";
import { ApiTypes } from "../types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = "http://172.20.10.3:5000";


// 모든 데이터 가져오기
export const fetchData: ApiTypes["fetchData"] = async ({ table, year, month }) => {
  console.log("fetchData", table, "api start######");
  try {
    const rsp = await axios.get(`${BASE_URL}/api/sales`, {
      params: {
        category: table,
        year,
        month,
      },
    });
    console.log("API Response:", rsp.data);
    return rsp.data;
  } catch (error) {
    console.error("오류 발생!", error);
  }
};

// 모든 통계 가져오기
export const fetchTotalData: ApiTypes["fetchTotalData"] = async () => {
  console.log("fetchTotalData", "api start######");
  try {
    const rsp = await axios.get(`${BASE_URL}/api/sales/total`);
    console.log("API Response:", rsp.data);
    return rsp.data;
  } catch (error) {
    console.error("오류 발생!", error);
  }
};


// 데이터 추가하기
export const fetchAddData: ApiTypes["fetchAddData"] = async (newData) => {
  console.log("fetchAddData api start", newData);
  try {
    const rsp = await axios.post(`${BASE_URL}/api/sales`, newData);
    console.log("API Response:", rsp.data);
    return rsp;
    // return 'real_id'
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
  console.log("fetchUpdateData api start", updateData);

  try {
    const rsp = await axios.put(`${BASE_URL}/api/sales`, updateData);
    console.log("API Response:", rsp);
    return rsp;
  } catch (error) {
    console.error("오류 발생!", error);
    throw error;
  }
};

/*
리액트 쿼리로 겟 요청 캐싱
배포
*/
