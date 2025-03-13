import React from 'react'
import useAppStore from '../../store/useAppStore'
import { TableData } from '../../types/types';

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
const menuWidth = [0.8, 1, 2, 1, 2, 2];
const Table = ({ tableData }: { tableData: TableData[] }) => {
  const { table } = useAppStore();
  return (
    <article
      className='bg-red-500 max-w-7xl w-full text-2xl text-center'>
      <p className='text-4xl font-bold text-left mb-10'>{table}</p>
      <ul
        className='grid bg-yellow-400'
        style={{ gridTemplateColumns: menuWidth.map(w => `${w}fr`).join(" ") }}>
        {
          tableMenu.map((item) => (
            table === item.table &&
            item.menuList.map((menu, index) => (
              <li
                key={index}
                className='self-center '
              >{menu}</li>
            ))
          ))
        }
      </ul>
      <ul>
        {
          tableData.map((item,) => (
            <li 
            key={item._id}
            ></li>
          ))
        }
      </ul>
    </article>
  )
}

export default Table