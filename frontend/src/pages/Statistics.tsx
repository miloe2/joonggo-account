import StatisticsTable from '../components/common/StatisticsTable';

const Statistics = () => {
  return (
    <div className='w-full h-full pt-10 max-w-[1440px] mx-auto'>
      <p className='text-4xl font-bold text-left'>통계</p>
      <div className='text-4xl font-black py-4'>{new Date().getFullYear()}년</div>
      <StatisticsTable />
    </div>
  )
}

export default Statistics 