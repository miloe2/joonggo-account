import React from 'react'
const rst = [
  {
    "_id": {
      "year": 2025,
      "month": 2
    },
    "categories": [
      {
        "category": "매출",
        "total": 20000
      }
    ]
  },
  {
    "_id": {
      "year": 2025,
      "month": 3
    },
    "categories": [
      {
        "category": "매출",
        "total": 124457
      }
    ]
  },
  {
    "_id": {
      "year": 2025,
      "month": 4
    },
    "categories": [
      {
        "category": "지출",
        "total": 30000
      },
      {
        "category": "매출",
        "total": 202027349
      }
    ]
  }
];
const CATEGORY_LIST = ['매출', '매입', '지출', '계'];
const menuWidth = [20, 20, 20, 20];

const StatisticsTable = () => {
  return (
    <article
      className='max-w-[1440px] w-full text-2xl text-center mx-auto'>
      {/* <style>{customStyle}</style> */}
      <table className='w-full table-auto'>
        <thead className='bg-violet-300'>
          <tr >
            <th>월</th>
            {
              CATEGORY_LIST.map((head) => (
                <th
                  className='self-center py-4'
                >{head}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rst.map((list, index) => (
              <tr
                key={index}
                className={`${index % 2 === 1 ? 'bg-zinc-100' : ''} border-y-2 border-zinc-300`}
              >
                <td className='w-[10%] border-r-2'>{list._id.month}월</td>
                {
                  CATEGORY_LIST.map((category, i) => {
                    const found = list.categories.find((c) => c.category === category);
                    return (
                      <td
                        key={category}
                        className={`w-[${menuWidth[i]}%] p-4 text-right ${CATEGORY_LIST.length -1 === i ? '' : 'border-r-2'}`}>
                        {found?.total?.toLocaleString() ?? 0}
                      </td>
                    );
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* {
        rst.map((list, index) => (
          <div key={index}>
            {list._id.month}
          </div>
        ))
      } */}
    </article>
  )
}

export default StatisticsTable