export const formattedDate = (strDate : string) => {
  let date = new Date(strDate);
  let YYMMDD = [date.getFullYear(), date.getMonth() + 1 , date.getDate()];
  return YYMMDD
}