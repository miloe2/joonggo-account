import StatisticsTable from '../components/common/StatisticsTable';
import { fetchTotalData } from '../api';
import { TotalData } from '../types/types';
import { useQuery } from '@tanstack/react-query';


const Statistics = () => {
  const { data, isLoading } = useQuery<TotalData[]>({
    queryKey: ['total'],
    queryFn: () => fetchTotalData(),
    staleTime: 1000 * 60 * 5, // 5분간 fresh
  });

  return (
    <div className='w-full h-full pt-10 max-w-[1440px] mx-auto'>
      <p className='text-4xl font-bold text-left'>통계</p>
      <div className='text-4xl font-black py-4'>{new Date().getFullYear()}년</div>
      {data && <StatisticsTable totalData={data} />}

      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <p className="text-lg font-semibold animate-pulse">로딩 중...</p>
        </div>
      )}
    </div>
  )
}

export default Statistics 