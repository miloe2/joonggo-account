export const formattedDate = (strDate : string) => {
  let date = new Date(strDate);
  let YYMMDD = [date.getFullYear(), date.getMonth() + 1 , date.getDate()];
  return YYMMDD
}

export const formatPhoneNumber = (value: string) => {
  // 숫자만 추출
  const onlyNums = value.replace(/[^0-9]/g, '');
  if (onlyNums.length < 4) return onlyNums;
  if (onlyNums.length < 8) return `${onlyNums.slice(0,3)}-${onlyNums.slice(3)}`;
  return `${onlyNums.slice(0,3)}-${onlyNums.slice(3,7)}-${onlyNums.slice(7,11)}`;
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
