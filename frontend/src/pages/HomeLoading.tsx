import React from 'react'

const HomeLoading = () => {
  const skeletonWidth = [
    [50, 50, 50],
    [60, 80, 40],
    [70, 90, 80],
    [70, 60, 70],
    [40, 40, 60],
    [80, 50, 60],
  ]

  return (
    <div className='w-full h-full py-10 max-w-[1440px] mx-auto animate-pulse'>
      <div className='text-4xl font-bold text-left bg-slate-300 flex w-40 h-10 rounded-md '></div>
      <div className='bg-slate-300 w-60 h-10  rounded-md my-4' />
      <div className='mt-10 relative'>
        <div className='absolute -top-10 right-0 w-48 h-6 bg-slate-300 rounded-md' />

        <div className="w-full mt-10 space-y-6">
          {/* 표의 헤더 */}
          <div className="flex w-full">
            {
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='bg-slate-300 rounded-md h-12'
                  style={{
                    width: `${i === 0 ? 10 : 20}%`,
                    marginRight: i === 5 ? 0 : '16px'
                  }} />
              ))
            }
          </div>
          {/* 더미 데이터 */}
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex w-full">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-6"
                  style={{
                    width: `${index === 0 ? 10 : 20}%`,
                    marginRight: index === 5 ? 0 : '16px'
                  }}
                >
                  <div
                    className="bg-slate-200 rounded-md h-6"
                    style={{ width: `${skeletonWidth[index][rowIndex]}%` }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default HomeLoading