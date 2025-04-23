import { useRef, useEffect } from 'react';
import useAppStore from '../../store/useAppStore'
import { PendingChange, TableData, DataWithClientKey, YearMonth } from '../../types/types';
import { formatPhoneNumber, formatPriceNumber, generatedDate, getWeekday } from '../../utils/utils';
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

const tableColor: Record<string, string> = {
  '매출': 'bg-yellow-300',
  '지출': 'bg-blue-300',
  '매입': 'bg-green-300',
};

const customStyle = `
input {
  padding: 12px 0;
}
`;

const Table = ({ yearMonth, sum }: { yearMonth: YearMonth, sum: { total: number, danggn: number } }) => {
  const { table, updateTableData, addTableRow, queueChange, clearPendingChanges } = useAppStore();
  const tableData = useAppStore((state) => state.tableData);
  const tableDataRef = useRef(tableData);

  useEffect(() => {
    tableDataRef.current = tableData; // 항상 최신 상태로 갱신
  }, [tableData]);


  const handleUpdate = (item: TableData, key: keyof TableData, value: string | number | boolean) => {
    updateTableData(item._id, key, value);
    // queueChange({ id: item._id, category: item.category, key, value });
    pendingIds.current.add(item._id);
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

    return {
      _id: generatedId,
      clientKey: generatedId,
      category: overrides.category ?? "",
      product: undefined,
      price: undefined,
      address: undefined,
      contact: undefined,
      saleDate: undefined,
      isActive: false,
      ...overrides, // ✅ 덮어쓰기
    };
  };

  const addTempRow = () => {
    const initValue = createInitialTableData(true, { category: table, saleDate: generatedDate(yearMonth) })
    addTableRow(initValue);
    // console.log(pendingChanges);
  };

  const changeRealId = (temp_id: string, real_id: string) => {
    updateTableData(temp_id, '_id', real_id)
  }

  const pendingIds = useRef(new Set<string>());
  const autoSaveData = async () => {
    if (pendingIds.current.size === 0) return;

    const tasks = Array.from(pendingIds.current).map(async (id) => {
      const row = tableDataRef.current.find((r) => r._id === id);
      if (!row) {
        console.warn(`ID ${id}에 해당하는 데이터가 없습니다.`);
        return;
      }
      if (typeof row.price === "string") {
        const onlyNumber = (row.price as string).replace(/[^0-9.-]/g, "");
        row.price = Number(onlyNumber);
      }
      try {
        if (row._id.startsWith('temp')) {
          const { _id, ...dataWithoutId } = row;
          const rsp = await fetchAddData(dataWithoutId);
          if (rsp.status === 201) {
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
    await Promise.all(tasks)
    console.log(`[autosave] ${pendingIds.current.size}건 저장 시도 완료`);
    pendingIds.current.clear();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      autoSaveData();
    }, 4500);
    return () => clearInterval(interval);
  }, []);


  return (
    <article
      className='w-full text-2xl text-center mx-auto relative mt-10'>
      {
        table !== '매출' &&
        <div className='absolute -top-10 right-0 flex justify-between'>
          <span className='font-semibold mr-2'>{table} :</span>
          {sum.total.toLocaleString()}원
        </div>
      }
      {
        table === '매출' &&
        <div className='absolute -top-16 right-0 flex justify-between'>
          <div>
            <span className='font-semibold mr-2'>{table} :</span> <br />
            <span className='font-semibold mr-2'>당근 :</span>
          </div>
          <div>
            {sum.total.toLocaleString()}원 <br />
            {sum.danggn.toLocaleString()}원
          </div>
        </div>
      }

      <style>{customStyle}</style>
      <table className='w-full table-fixed'>
        <thead className={`${tableColor[table]} sticky top-0 z-10`}>
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
                  <div className="flex items-center justify-center relative">
                    <input
                      type="date"
                      className={`${index % 2 === 1 ? 'bg-zinc-100' : ''}`}
                      value={item.saleDate ? item.saleDate.slice(0, 10) : ""}
                      onChange={(e) => handleUpdate(item, 'saleDate', e.target.value)}
                    />
                    {item.saleDate && (
                      <span className="absolute right-8 top-1/2 -translate-y-1/2  pointer-events-none">
                        {getWeekday(item.saleDate)}
                      </span>
                    )}
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
                    type="text"
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
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        // e.preventDefault(); // 기본 Tab 이동 방지 (선택 사항)
                        addTempRow();
                      }
                    }}
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
