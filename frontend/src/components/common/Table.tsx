import { useRef, useEffect } from 'react';
import useAppStore from '../../store/useAppStore'
import { PendingChange, TableData, DataWithClientKey, YearMonth } from '../../types/types';
import { formatPhoneNumber, formatPriceNumber } from '../../utils/utils';
import { fetchAddData, fetchUpdateData } from '../../api';

const tableMenu = [
  {
    table: '매출',
    menuList: ['번호', '일자', '물건', '금액', '연락처', '주소']
  },
  {
    table: '매입',
    menuList: ['번호', '일자', '물건', '물건값', '연락처', '주소']
  },
  {
    table: '지출',
    menuList: ['번호', '일자', '인건비내용', '인건비', '연락처', '주소']
  },
];
const menuWidth = [5, 10, 20, 10, 10, 15];

const customStyle = `
input {
  padding: 12px 0;
}
`;

/* TODO
1. 월별로 보여주기
1-1. 월 단위 devider (sticky?)
2. 매출/매입/지출로 보여주기
3. 캐싱하기 / 렌더링 최적화
 */
const Table = ({ tableData, yearMonth, total }: { tableData: DataWithClientKey[], yearMonth: YearMonth, total: number }) => {
  const { table, updateTableData, addTableRow, queueChange, clearPendingChanges } = useAppStore();
  const pendingChanges = useAppStore((state) => state.pendingChanges);
  const pendingRef = useRef(pendingChanges);

  useEffect(() => {
    pendingRef.current = pendingChanges; // 항상 최신 상태로 갱신
  }, [pendingChanges]);


  const handleUpdate = (item: TableData, key: keyof TableData, value: string | number | boolean) => {
    updateTableData(item._id, key, value);
    queueChange({ id: item._id, category: item.category, key, value });
  };


  const createInitialTableData = (
    withTempId: boolean = true,
    overrides: Partial<TableData> = {}
  ): DataWithClientKey => {

    if (typeof overrides.price === "string") {
      const onlyNumber = (overrides.price as string).replace(/[^0-9.-]/g, "");
      overrides.price = Number(onlyNumber);
    };

    const generatedId = withTempId ? `temp-${Date.now()}` : "";
    const today = new Date();
    const todayDate = today.getDate();

    // 해당 월과 연도인지 체크
    const isSameMonth =
      today.getFullYear() === yearMonth.year &&
      today.getMonth() === yearMonth.month - 1;

    // 사용할 날짜 객체
    const baseDate = isSameMonth
      ? today
      : new Date(yearMonth.year, yearMonth.month - 1, todayDate);

    // 한국 시간 기준 YYYY-MM-DD 형식으로 반환
    const generatedDate = new Date(baseDate.getTime() + 9 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    return {
      _id: generatedId,
      clientKey: generatedId,
      category: overrides.category ?? "",
      product: undefined,
      price: undefined,
      address: undefined,
      contact: undefined,
      saleDate: generatedDate,
      isActive: false,
      ...overrides, // ✅ 덮어쓰기
    };
  };

  const addTempRow = () => {
    const initValue = createInitialTableData(true, { category: table })
    addTableRow(initValue);
    // console.log(pendingChanges);
  };

  // pendingChanges를 그룹핑함
  const groupingId = (pendingList: PendingChange[]) => {
    const grouped = new Map<string, Partial<TableData>>();
    pendingList.forEach((item) => {
      if (!grouped.has(item.id)) {
        grouped.set(item.id, { _id: item.id, category: item.category });
      }
      const current = grouped.get(item.id)!;
      current[item.key] = item.value;
      grouped.set(item.id, current);
    });

    return grouped;
  };

  const changeRealId = (temp_id: string, real_id: string) => {
    updateTableData(temp_id, '_id', real_id)
  }

  const autoDataSave = async () => {
    if (pendingRef.current.length === 0) return;
    const groupedId = groupingId(pendingRef.current);

    const tasks = Array.from(groupedId.values()).map(async (mapItem) => {
      const newData = createInitialTableData(false, mapItem);
      try {
        if (mapItem._id?.startsWith('temp')) {
          const { _id, ...dataWithoutId } = newData;
          const rsp = await fetchAddData(dataWithoutId);
          if (rsp.status === 201) {
            changeRealId(_id, rsp.data._id);
          }
        } else {
          const rsp = await fetchUpdateData(newData);
          if (rsp.status !== 200) {
            console.error('업데이트 실패', rsp.data._id);
          }
        }
      } catch (error) {
        console.error(error);
      }

    });
    await Promise.all(tasks);
    console.log(`[autosave] ${groupedId.size}건 저장 시도 완료`);
    clearPendingChanges();
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     autoDataSave();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const tableColor: Record<string, string> = {
    '매출': 'bg-yellow-300',
    '지출': 'bg-blue-300',
    '매입': 'bg-green-300',
  }

  return (
    <article
      className='w-full text-2xl text-center mx-auto relative mt-10'>
      <div className='absolute -top-10 right-0'>
        <span className='font-semibold'>{table}:</span> {total.toLocaleString()}원</div>

      <style>{customStyle}</style>
      <table className='w-full table-fixed'>
        <thead className={`${tableColor[table]} sticky top-0`}>
          <tr>
            {
              tableMenu.map((item) => (
                table === item.table &&
                item.menuList.map((menu, index) => (
                  <th
                    key={index}
                    className='self-center py-4'
                    style={{ width: `${menuWidth[index]}%` }}
                  >{menu}</th>
                ))
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            tableData?.map((item, index) => (
              <tr
                key={item.clientKey}
                className={`${index % 2 === 1 ? 'bg-zinc-100' : ''} border-y-2 border-zinc-300 `}
              >
                <td className='border-r-2 border-zinc-300'>
                  {index + 1}
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <div className="flex items-center justify-center">
                    <input
                      type="date"
                      className={`${index % 2 === 1 ? 'bg-zinc-100' : ''}`}
                      value={item.saleDate.slice(0, 10)}
                      onChange={(e) => handleUpdate(item, 'saleDate', e.target.value)}
                    />
                  </div>
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <input
                    className={`${index % 2 === 1 ? 'bg-zinc-100' : ''} w-full px-4`}
                    type="text"
                    onChange={(e) => handleUpdate(item, 'product', e.target.value)}
                    value={item.product ?? ""} />
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <input
                    className={`${index % 2 === 1 ? 'bg-zinc-100' : ''} w-full px-4 text-right`}
                    type="text"
                    onChange={(e) => handleUpdate(item, 'price', formatPriceNumber(e.target.value))}
                    value={formatPriceNumber(item.price as number) ?? ""} />
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <input
                    className={`${index % 2 === 1 ? 'bg-zinc-100' : ''} w-full px-4`}
                    type="tel"
                    value={item.contact ?? ""}
                    onChange={(e) =>
                      handleUpdate(item, 'contact', formatPhoneNumber(e.target.value))
                    }
                  /></td>
                <td >
                  <input
                    className={`${index % 2 === 1 ? 'bg-zinc-100' : ''} w-full px-4`}
                    type="text"
                    onChange={(e) => handleUpdate(item, 'address', e.target.value)}
                    value={item.address ?? ""} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={addTempRow}
          className="group flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-md transition duration-200 ease-in-out"
        >
          <span className='group-hover:rotate-45 transition-transform'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </span>
          <p>
            새 항목 추가하기
          </p>
        </button>
        {/* <button className='bg-blue-300' onClick={() => autoDataSave()}>autoSave</button> */}
      </div>


    </article>
  )
}

export default Table;

/*
// 월별로 나누기 위한 코드 (미사용)
const groupedByMonth = (rawData: TableData[]) => {
  const groups: Record<string, TableData[]> = {};
  rawData.forEach((item) => {
    const date = new Date(item.saleDate);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  })
  return groups;
};

const groupedDataByMonth = groupedByMonth(tableData);
*/