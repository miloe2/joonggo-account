import { useState } from 'react';
import useAppStore from '../store/useAppStore';
import { useLocation, useNavigate } from 'react-router-dom';

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
      className='bg-blue-00 w-full h-svh fixed p-10'
      style={{ maxWidth: `${width}px` }}
    >
      <ul className='text-4xl space-y-8'>
        {
          Object.keys(menu).map((item, index) => (
            <li
              key={index}
              onClick={() => handleMenu(item)}
              className={`
              ${activeMenu === item ? 'text-blue-500 font-bold bg-blue-500' : 'text-black bg-black'}
              cursor-pointer 
              `}
            >{item}</li>
          ))
        }
      </ul>
    </aside>
  )
}

export default SideMenu