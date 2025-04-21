import { useState } from 'react';
import useAppStore from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

const menu: Record<string, string> = {
  '매출': '/',
  '매입': '/',
  '지출': '/',
  '통계': '/statistics',
}
const SideMenu = ({ width }: { width: Number }) => {
  const navigate = useNavigate();
  const { table, setTable } = useAppStore();
  const [activeMenu, setActiveMenu] = useState<string>(table);
  const handleMenu = (title: string) => {
    navigate(menu[title])
    setActiveMenu(title);

    if (title === '통계') return;
    setTable(title);
  };

  return (
    <aside
      className='bg-blue-00 w-full h-svh fixed  pt-36'
      style={{ maxWidth: `${width}px` }}
    >
      <ul className='text-4xl space-y-8'>
        {
          Object.keys(menu).map((item, index) => (
            <li
              key={index}
              className={`
              ${activeMenu === item ? 'text-blue-500 font-bold bg-blue-00' : 'text-black bg-lack'}
              `}
            ><span
              onClick={() => handleMenu(item)}
              className='bg-red-00 px-10 cursor-pointer'
            >{item}</span> </li>
          ))
        }
      </ul>
    </aside>
  )
}

export default SideMenu