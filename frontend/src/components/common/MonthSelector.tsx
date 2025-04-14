import long_arrow from '../../assets/icons/long_arrow.svg'


//@ts-ignore
const MonthSelector = ({ yearMonth, onChange }) => {
  const { year, month } = yearMonth;

  const handleMonthBtn = (type: 'prev' | 'next') => {
    let newYear = year;
    let newMonth = month;
    if (type === 'prev') {
      if (month === 1) {
        newYear -= 1;
        newMonth = 12;
      } else {
        newMonth -= 1;
      }
    } else if (type === 'next') {
      if (month === 12) {
        newYear += 1;
        newMonth = 1;
      } else {
        newMonth += 1;
      }
    };
    onChange({ year: newYear, month: newMonth });
  };

  return (
    <section className='flex items-center space-x-4 my-4'>
      <button className='rotate-180 '
        onClick={() => handleMonthBtn('prev')}>
        <img src={long_arrow} alt="" />
      </button>
      <p className='text-4xl font-black'>{year}. {String(month).padStart(2, "0")}</p>
      <button onClick={() => handleMonthBtn('next')}>
        <img src={long_arrow} alt="" />
      </button>
    </section>
  )
}

export default MonthSelector