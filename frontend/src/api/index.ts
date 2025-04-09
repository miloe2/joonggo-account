import axios from "axios";
import { ApiTypes } from "../types/types";

// const BASE_URL = "http://172.20.10.3:3000";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL = "http://localhost:5000";

export const fetchData: ApiTypes["fetchData"] = async (table) => {
  console.log("fetchData", table, "api start######");
  try {
    const rsp = await axios.get(`${BASE_URL}/api/sales`);
    console.log("API Response:", rsp.data);
    return rsp.data;
  } catch (error) {
    console.error("오류 발생!", error);
  }
};

// 
// export const updateData = async (changes) => {
//   console.log("updateData", "api start######");
//   try {
//     const rsp = await axios
//   } catch (error) {
    
//   }
// }

/** process
사용자입력 -> pendignChanges로 이동 -> interval 5초마다 updateData(pendingChanges)호출 
### updateData(pendingChanges) 설명
- pengdingChanges.length !== 0
- pendingChanges를 id값으로 group화
- group.foreach(id값에 따른 api 호출 (생성/수정))
- pendingChange = [] 초기화
*/ 

// 데이터 추가하기
export const fetchAddData = async () => {
  console.log("fetchAddData api start");
  try {
    const rsp = await axios.post(`${BASE_URL}/api/sales`, {

    });
    console.log("API Response:", rsp.data);
  } catch (error) {
    console.error("오류 발생!", error);
  }
};