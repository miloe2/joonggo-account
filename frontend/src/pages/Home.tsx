import Table from '../components/common/Table'
import useAppStore from '../store/useAppStore'

const Home = () => {
  const { tableData } = useAppStore();
  return (
    <div className='w-full h-full pt-10'>
      <Table tableData={tableData}/>
    </div>
  )
}

export default Home