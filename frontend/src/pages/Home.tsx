import Table from '../components/common/Table'
import useAppStore from '../store/useAppStore'
import { fetchData } from '../api';
import { useEffect, useState } from 'react';
import MonthSelector from '../components/common/MonthSelector';

const Home = () => {
  const { table, tableData, setTableData } = useAppStore();

  useEffect(() => {
    (async () => {
      const data = await fetchData(table);
      setTableData(data);
    })();
  }, []);

  return (
    <div className='w-full h-full pt-10'>
      <p className='text-4xl font-bold text-left'>{table}</p>

      <MonthSelector />
      <Table tableData={tableData} />
    </div>
  )
}

export default Home 