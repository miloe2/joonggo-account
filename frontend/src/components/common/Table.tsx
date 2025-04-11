import { useState, Fragment } from 'react';
import useAppStore from '../../store/useAppStore'
import { TableData } from '../../types/types';
import { formattedDate, formatPhoneNumber, formatPriceNumber } from '../../utils/utils';
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
const menuWidth = [5, 10, 20, 10, 20, 20, 20];

const customStyle = `
input {
  padding: 12px 0;
}
`;

// const menuWidth = [0.8, 1, 2, 1, 2, 2, 1];
/* TODO
 * 1. 클릭하면 수정 할수 있게하기. 
데이터 값들은 input박스에 넣고, 클릭하면 useState(item)으로 추적하고, 변경있을 때, focus out이면, 수정 post 보내기
2. 날짜를 어떻게 처리할지.
string 날짜를 MM/DD 로 분할하여 input으로 넣고, input 값을 바탕으로 date를 다시 계산하는 함수 생성
3. 추가 
하단에 빈 input을 넣어주고, 클릭하면 useState new value로 관리.

-- 데이터를 카테고리별로 호출함 => 1번. 클라이언트 사이드에서 관리를 해야함. 수정을 했을 경우 수정된게 보이고 (데이터를 저장히지 않더라도, ) , 2번. 나중에는 데이터를 저장해야함.

1번 : (월별 호출) zustand로 전역으로 관리하기, zustand로 저장하기 & 데이터 수정하기 

  //   pendingChanges = [
  //     {
  //         "id": "temp-1744257706123",
  //         "key": "product",
  //         "value": " 세탁기 판매"
  //     },
  //     {
  //         "id": "temp-1744257706123",
  //         "key": "price",
  //         "value": "20,000"
  //     },
  //     {
  //         "id": "67cea30aaa6ee6cdcf10b5f3",
  //         "key": "contact",
  //         "value": "010-1111-2222"
  //     }
  //     {
  //         "id": "67cea30aaa6ee6cdcf10b5f3",
  //         "key": "price",
  //         "value": "20000"
  //     }
  // ]
 */
const Table = ({ tableData }: { tableData: TableData[] }) => {
  const { table, updateTableData, addTableRow, pendingChanges, queueChange, clearPendingChanges } = useAppStore();

  const handleUpdate = (id: string, key: keyof TableData, value: string | number | boolean) => {
    updateTableData(id, key, value);
    queueChange({ id, key, value });
  };


  const createInitialTableData = (
    category: string,
    withTempId: boolean = true,
    overrides: Partial<TableData> = {}
  ): TableData => {

    if (typeof overrides.price === "string") {
      const onlyNumber = (overrides.price as string).replace(/[^0-9.-]/g, "");
      overrides.price = Number(onlyNumber);
    };

    return {
      _id: withTempId ? `temp-${Date.now()}` : "",
      category,
      product: "",
      price: 0,
      address: "",
      contact: "",
      saleDate: new Date().toISOString(),
      isActive: false,
      ...overrides, // ✅ 덮어쓰기
    };
  };

  const addTempRow = () => {
    const initValue = createInitialTableData(table)
    addTableRow(initValue);
    console.log(pendingChanges)
  };

  // pendingChanges를 그룹핑함
  const groupingId = () => {
    const grouped = new Map<string, Partial<TableData>>();
    pendingChanges.forEach((item) => {
      if (!grouped.has(item.id)) {
        grouped.set(item.id, { _id: item.id });
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

  const autoDataSave = () => {
    if (pendingChanges.length === 0) return;
    const groupedId = groupingId();
    // grouping 된 Map을 객체로 변환환
    groupedId.forEach(async (mapItem) => {
      const newData = createInitialTableData(table, false, mapItem);
      console.log(newData, 'newData')
      try {
        if (mapItem._id?.startsWith('temp')) {
          const { _id, ...dataWithoutId } = newData;

          // console.log('fetchAddData', dataWithoutId);
          const rsp = await fetchAddData(dataWithoutId);
          console.log(rsp)
          if (rsp?.status === 200 || rsp?.status === 201) {
            changeRealId(_id, rsp.data._id);
            clearPendingChanges();
          }

        } else {
          const rsp = await fetchUpdateData(newData);
          if (rsp?.status === 200 || rsp?.status === 201) {
            clearPendingChanges();
          }
        }
      } catch (error) {
        console.log(error);
      }
    })
  };

  return (
    <article
      className='max-w-[1440px] w-full text-2xl text-center mx-auto'>
      <style>{customStyle}</style>
      <p className='text-4xl font-bold text-left mb-10'>{table}</p>
      <button onClick={() => console.log(tableData)}>check data</button>
      <table className='w-full table-auto'>
        <thead className='bg-yellow-300'>
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
            tableData.map((item, index) => (
              <tr
                key={item._id}
                className='bg-red-00 border-y-2 border-zinc-300'
              >
                <td className='border-r-2 border-zinc-300'>{index + 1}{item._id}</td>
                <td className='border-r-2 border-zinc-300'>
                  <div className="flex items-center justify-center">
                    <input
                      type="date"
                      value={item.saleDate.slice(0, 10)}
                      onChange={(e) => handleUpdate(item._id, 'saleDate', e.target.value)}
                    />
                  </div>
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <input
                    className='w-full px-2'
                    type="text"
                    onChange={(e) => handleUpdate(item._id, 'product', e.target.value)}
                    value={item.product} />
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <input
                    className='w-full px-2'
                    type="text"
                    onChange={(e) => handleUpdate(item._id, 'price', formatPriceNumber(e.target.value))}
                    value={item.price} />
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <input
                    className='w-full px-2'
                    type="tel"
                    value={item.contact}
                    onChange={(e) =>
                      handleUpdate(item._id, 'contact', formatPhoneNumber(e.target.value))
                    }
                  /></td>
                <td >
                  <input
                    className='w-full px-2'
                    type="text"
                    onChange={(e) => handleUpdate(item._id, 'address', e.target.value)}
                    value={item.address} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='w-full flex flex-col'>
        <button className='bg-red-300' onClick={() => addTempRow()}>추가하기</button>
        <button className='bg-blue-300' onClick={() => autoDataSave()}>autoSave</button>
      </div>
    </article>
  )
}

export default Table;

