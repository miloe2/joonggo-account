import { useState } from 'react'

const menu = [
  { title: '매출', path: '/' },
  { title: '매입', path: '/' },
  { title: '지출', path: '/' },
  { title: '통계', path: '/' },
]
const SideMenu = ({ width }: { width: Number }) => {
  const [isActived, setIsActived] = useState('매출')

  return (
    <aside
      className='bg-blue-00 w-full h-svh fixed p-10'
      style={{ maxWidth: `${width}px` }}
    >
      <ul className='text-4xl space-y-8'>
        {
          menu.map((item, index) => (
            <li
              key={index}
              onClick={() => setIsActived(item.title)}
              className={`
              ${isActived === item.title ? 'text-blue-500 font-bold bg-blue-500' : 'text-black bg-black'}
              cursor-pointer 
              `}
            >{item.title}</li>
          ))
        }
      </ul>
    </aside>
  )
}

export default SideMenu