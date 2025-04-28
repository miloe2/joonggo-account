# 🧾 Joonggo Account — 매출/매입 관리 앱
   
   
> **"부모님 가게의 거래 관리를 위한 가계부 웹앱입니다."**  
> - 개발 대상: 부모님 (PC 사용 최소화, 데이터 보존 우선)  
> - 기술 목표: 실용성과 안정성 중심 설계 (IME 대응, AutoSave 최적화)

---   

## ✨ 주요 기능

- **자동 저장(Auto Save)**  
  사용자가 입력을 멈추거나, 포커스가 이동할 때 데이터가 자동으로 서버에 저장됩니다.

- **임시 ID(temp) 처리**  
  새로 입력된 데이터는 서버 응답(201 Created) 후 real ID로 전환되며, 내부 상태를 즉시 동기화합니다.

- **간편 로컬 인증**  
  `localStorage` 기반 API Key로 접근 제어. 별도의 로그인 없이 본인 컴퓨터에서만 접근 가능하도록 설정했습니다.

- **IME(한글 조합 입력) 안전성 대응**  
  입력 도중 포커스를 잃더라도 조합 중 글자가 누락되지 않도록 composition 이벤트를 기반으로 저장 타이밍을 조절했습니다.

- **고연령층 친화적 UX**  
  한글 입력 우선, 폰트 크기 조정, TAB 이동 최적화, 입력 필드 최소화 등 부모님 사용자 경험을 고려했습니다.

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | React + Zustand + React-Query + Tailwind CSS |
| Backend | Express + MongoDB (Mongoose) |
| Deploy | Render.com |
| 상태 관리 | `tableData`를 단일 소스로 관리 |
| 기타 고려사항 | IME 감지, 로컬 인증, AutoSave, temp ID 처리 |

---

## 📂 프로젝트 구조

```
project-root/
├── frontend/          # Vite + React 앱
│   ├── components/    # 테이블, 입력 필드 등
│   └── pages/         # Home, Statistics 등
│
├── backend/           # Express 서버
│   ├── controllers/   # API 로직
│   ├── models/        # Mongoose 모델
│   └── routes/        # REST API 엔드포인트
```
---

## 🚀 설치 및 실행 방법

### 1. Backend 실행

```bash
cd backend
npm install
node app.js
```

### 1. Fronetend 실행
```bash
cd frontend
npm install
npm run dev
```
---
## 🧩 주요 코드 스니펫

### ✨ 입력 데이터 자동 저장 흐름

사용자가 입력한 데이터는 `pendingIds`로 변경 사항을 추적하고, 주기적으로 서버에 저장됩니다.  
저장 과정에서는 IME 입력 안정성, 임시 ID(temp-id) 처리, 타입 정제(string → number)가 반영되어 있습니다.

```tsx
// 자동 저장 기능
const autoSaveData = async () => {
  // 큐 값이 비었다면 return;
  if (pendingIds.current.size === 0) return;

  const tasks = Array.from(pendingIds.current).map(async (id) => {
    // 변경해야할 row 찾기
    const row = tableDataRef.current.find((r) => r._id === id);
    if (!row) {
      console.warn(`ID ${id}에 해당하는 데이터가 없습니다.`);
      return;
    }
    // price type string -> number 변경
    if (typeof row.price === "string") {
      const onlyNumber = (row.price as string).replace(/[^0-9.-]/g, "");
      row.price = Number(onlyNumber);
    }
    try {
      if (row._id.startsWith('temp')) {
        const { _id, ...dataWithoutId } = row;
        const rsp = await fetchAddData(dataWithoutId);
        if (rsp.status === 201) {
          // 임시id를 생성된 DB _id로 변경
          changeRealId(_id, rsp.data._id);
        }
      } else {
        const rsp = await fetchUpdateData(row);
        if (rsp.status !== 200) {
          console.error('업데이트 실패', rsp.data._id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  await Promise.all(tasks);
  console.log(`[autosave] ${pendingIds.current.size}건 저장 시도 완료`);
  // 저장 완료 된 이후 큐 비우기
  pendingIds.current.clear();
};
```
