import { useState, Fragment } from 'react';
import useAppStore from '../../store/useAppStore'
import { TableData } from '../../types/types';
import { formattedDate } from '../../utils/utils';

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
 */
const Table = ({ tableData }: { tableData: TableData[] }) => {
  const { table } = useAppStore();
  const [initData, setInitData] = useState<TableData[]>(tableData);
  // ✅ input 값 변경 시 부모 상태 업데이트
  const handleUpdate = (id: string, key: keyof TableData, value: string | number | boolean) => {
    setInitData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [key]: value } : item
      )
    );
  };
  

  // 부모 GET요청 -> 자식 전달 -> 자식은 useState로 값을 지정


  return (
    <article
      className='max-w-[1440px] w-full text-2xl text-center mx-auto'>
      <style>{customStyle}</style>
      <p className='text-4xl font-bold text-left mb-10'>{table}</p>
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
                  <div className="flex items-center gap- justify-center">
                    {formattedDate(item.saleDate).map((val, i) => (
                      <Fragment key={i}>
                        <input
                          style={{ width: `${i === 0 ? '60' : '36'}px`, }}
                          maxLength={i === 0 ? 4 : 2}
                          type="number"
                          className='text-center'
                          value={val}
                        />
                        <span>.</span>
                      </Fragment>
                    ))}
                  </div>
                </td>
                <td className='border-r-2 border-zinc-300'>
                  <input
                    className='w-full px-2'
                    type="text"
                    value={item.product} />
                </td>
                <td className='border-r-2 border-zinc-300'>{item.price}</td>
                <td className='border-r-2 border-zinc-300'>{item.contact}</td>
                <td >{item.address}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </article>
  )
}

export default Table

