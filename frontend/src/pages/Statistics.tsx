import { useEffect, useState } from 'react';
import StatisticsTable from '../components/common/StatisticsTable';
import { fetchTotalData } from '../api';
import { TotalData } from '../types/types';


const Statistics = () => {
  const [totalData, setTotalData] = useState<TotalData[]>([]);
  useEffect(() => {
    (async () => {
      const rst = await fetchTotalData();
      setTotalData(rst);
    })();
  }, []);
  return (
    <div className='w-full h-full pt-10 max-w-[1440px] mx-auto'>
      <p className='text-4xl font-bold text-left'>통계</p>
      <div className='text-4xl font-black py-4'>{new Date().getFullYear()}년</div>
      <StatisticsTable totalData={totalData} />
    </div>
  )
}

export default Statistics 