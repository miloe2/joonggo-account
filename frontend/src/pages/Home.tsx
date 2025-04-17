import Table from '../components/common/Table'
import useAppStore from '../store/useAppStore'
import { fetchData } from '../api';
import { useEffect, useState } from 'react';
import MonthSelector from '../components/common/MonthSelector';

const Home = () => {
  const { table, tableData, setTableData } = useAppStore();
  const today = new Date();
  const [yearMonth, setYearMonth] = useState({ year: today.getFullYear(), month: today.getMonth() + 1 })

  useEffect(() => {
    (async () => {
      const data = await fetchData({ table, year: yearMonth.year, month: yearMonth.month });
      setTableData(data);
    })();
  }, [table, yearMonth.year, yearMonth.month]);

  return (
    <div className='w-full h-full py-10 max-w-[1440px] mx-auto'>
      <p className='text-4xl font-bold text-left'>{table}</p>
      <MonthSelector yearMonth={yearMonth} onChange={setYearMonth} />
      <Table tableData={tableData} />
    </div>
  )
}

export default Home 