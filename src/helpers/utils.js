export function formatDate(date, size = 10) {
  return date.toString().slice(0, size);
}
export function textCut(str = "", cutSize = 60) {
  if (str.length <= cutSize) {
    return str;
  }
  return (
    <>
      {str.slice(0, cutSize)}
      ...
    </>
  );
}
export function timeZone(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return formatDate(date.toISOString());
}
