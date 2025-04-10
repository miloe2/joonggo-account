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
- 사용자입력
- pendignChanges { id, key, value } 저장
- 기존 id, key가 동일하다면, 가장 최근에 들어온 입력값만 저장 
-> interval 5초마다 updateData(pendingChanges)호출 
### updateData(pendingChanges) 설명
- pengdingChanges.length !== 0
- pendingChanges를 id값으로 group화
- group.foreach(id값에 따른 api 호출 (생성/수정))
- (생성Postapi 호출 시) tempId를 Map저장
- 생성Post api 200일 때, real_id와 를 Map에 value로 저장
- zustand tableData의 temp 아이디를 real_id로 변환 
- pendingChange = [] 초기화
*/

// 데이터 추가하기
//@ts-ignore
export const fetchAddData: ApiTypes["fetchAddData"] = async (newData) => {
  console.log("fetchAddData api start");
  try {
    const rsp = await axios.post(`${BASE_URL}/api/sales`, {
      newData
    });
    console.log("API Response:", rsp.data);
    return rsp;
    // return 'real_id'
  } catch (error) {
    console.error("오류 발생!", error);
  }
};

// 데이터 업데이트
export const fetchUpdateData: ApiTypes["fetchUpdateData"] = async ({ id, key, value }) => {
  console.log("fetchUpdateData api start");
  try {
    const rsp = await axios.put(`${BASE_URL}/api/sales`, {
      id, key, value
    });
    console.log("API Response:", rsp);
  } catch (error) {
    console.error("오류 발생!", error);
  }
};
