import Table from '../components/common/Table'
import useAppStore from '../store/useAppStore'
import { fetchData } from '../api';
import { useEffect, useState, useMemo } from 'react';
import MonthSelector from '../components/common/MonthSelector';
import { useQuery } from '@tanstack/react-query';
import HomeLoading from './HomeLoading';

const Home = () => {
  const { table, setTableData } = useAppStore();
  const today = new Date();
  const [yearMonth, setYearMonth] = useState({ year: today.getFullYear(), month: today.getMonth() + 1 });

  const { data, isLoading } = useQuery({
    queryKey: ['table', table, yearMonth.year, yearMonth.month],
    queryFn: () => fetchData({ table, year: yearMonth.year, month: yearMonth.month }),
  });

  useEffect(() => {
    const dataWithClientKey = data?.map((item) => {
      return {
        ...item,
        clientKey: item._id
      }
    });
    dataWithClientKey && setTableData(dataWithClientKey);

  }, [data]);

  const sum = useMemo(() => {
    if (!data) return { total: 0, danggn: 0 };
    const total = data?.reduce((acc, curr) => acc + (curr.price ?? 0), 0);
    const danggn = data.reduce((acc, curr) => {
      if (curr.address?.includes("당근")) {
        return acc + (curr.price ?? 0);
      }
      return acc;
    }, 0);
    return { total, danggn }
  }, [data]);


  if (isLoading) return <HomeLoading />;


  return (
    <div className='w-full h-full py-10 max-w-[1440px] mx-auto'>
      <p className='text-4xl font-bold text-left'>{yearMonth.month}월 {table}</p>
      <MonthSelector yearMonth={yearMonth} onChange={setYearMonth} />
      <Table yearMonth={yearMonth} sum={sum} />
    </div>
  )
}

export default Home 