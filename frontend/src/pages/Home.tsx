import Table from '../components/common/Table'
import { TableData } from '../types/types'
const tableData = [
  {
    "_id": "67cea30aaa6ee6cdcf10b5f3",
    "category": "매출",
    "product": "중고 맥북 판매",
    "price": 200,
    "address": "M1 맥북에어 판매합니다.",
    "contact": "010-9155-3194",
    "saleDate": "2024-03-15T00:00:00.000Z",
    "isActive": false
  },
  {
    "_id": "67cea30aaa6ee6ccf10b5f3",
    "category": "매출",
    "product": "중고 맥북 판매",
    "price": 200,
    "address": "M1 맥북에어 판매합니다.",
    "contact": "010-9155-3194",
    "saleDate": "2024-03-15T00:00:00.000Z",
    "isActive": false
  },
  {
    "_id": "67cea30aaa6ee6cdcf10bf3",
    "category": "매출",
    "product": "중고 맥북 판매",
    "price": 200,
    "address": "M1 맥북에어 판매합니다.",
    "contact": "010-9155-3194",
    "saleDate": "2024-03-15T00:00:00.000Z",
    "isActive": false
  },
]

const Home = () => {
  return (
    <div className='bg-red-200 w-full h-full p-10'>
      <Table tableData={tableData}/>
    </div>
  )
}

export default Home