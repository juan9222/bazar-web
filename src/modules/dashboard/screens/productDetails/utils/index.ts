export const SERVICE_FEE = 0.05;

export const formatDate = (date: Date, format: string) => {
  const map: any = {
    mm: date.getMonth() + 1,
    MMM: date.toLocaleString('default', { month: 'long' }).substring(0, 3),
    dd: date.getDate(),
    yyyy: date.getFullYear()
  };

  return format.replace(/mm|MMM|dd|yyyy/g, matched => map[matched]);
};