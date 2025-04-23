import { YearMonth } from "../types/types";

export const formattedDate = (strDate: string) => {
  let date = new Date(strDate);
  let YYMMDD = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  return YYMMDD
}

export const formatPhoneNumber = (value: string) => {
  // 숫자만 추출
  const onlyNums = value.replace(/[^0-9]/g, '');
  if (onlyNums.length < 4) return onlyNums;
  if (onlyNums.length < 8) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};

export const formatPriceNumber = (value: string | number) => {
  // 문자열이면 숫자만 남기고 파싱
  const numberValue = typeof value === 'string'
    ? parseInt(value.replace(/[^0-9]/g, ''), 10)
    : value;

  // NaN일 경우 0 반환
  if (isNaN(numberValue)) return '0';

  // 천 단위 콤마 추가
  return numberValue.toLocaleString();
};

export const generatedDate = (yearMonth: YearMonth) => {
  const today = new Date();
  const todayDate = today.getDate();

  // 해당 월과 연도인지 체크
  const isSameMonth =
    today.getFullYear() === yearMonth.year &&
    today.getMonth() === yearMonth.month - 1;

  // 사용할 날짜 객체
  const baseDate = isSameMonth
    ? today
    : new Date(yearMonth.year, yearMonth.month - 1, todayDate);

  // 한국 시간 기준 YYYY-MM-DD 형식으로 반환
  const result = new Date(baseDate.getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  return result;
};

export const getWeekday = (dateStr: string) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const day = new Date(dateStr).getDay();
  return days[day];
};
