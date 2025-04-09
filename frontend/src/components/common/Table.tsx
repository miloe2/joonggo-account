import { useState, Fragment } from 'react';
import useAppStore from '../../store/useAppStore'
import { TableData } from '../../types/types';
import { formattedDate, formatPhoneNumber, formatPriceNumber } from '../../utils/utils';

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
 */
const Table = ({ tableData }: { tableData: TableData[] }) => {
  const { table, updateTableData, addTableRow } = useAppStore();
  const today = new Date()


  const handleUpdate = (id: string, key: keyof TableData, value: string | number | boolean) => {
    updateTableData(id, key, value);
  };

  const addTempRow = () => {
    const initValue =
    {
      "_id": `temp-${Date.now()}`,
      "category": table,
      "product": "",
      "price": 0,
      "address": "",
      "contact": "",
      "saleDate": today.toISOString(),
      "isActive": false
    };
    addTableRow(initValue);
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
                <td className='border-r-2 border-zinc-300'>{index + 1}</td>
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
      <button onClick={() => addTempRow()}>추가하기</button>
    </article>
  )
}

export default Table

