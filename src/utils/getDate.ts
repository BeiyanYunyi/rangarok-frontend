const formatNumber = (num:number) => {
  if (num >= 0 && num <= 9) return `0${num.toString()}`;
  return num.toString();
};

/** @returns YYYY-MM-DD */
const getDate = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = formatNumber(time.getMonth() + 1);
  const day = formatNumber(time.getDate());
  return `${year}-${month}-${day}`;
};

export default getDate;
