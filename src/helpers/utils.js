export function formatDate(date, size = 10) {
  return date.toString().slice(0, size);
}
export function textCut(str = "", taskId, cutSize = 60) {
  if (str.length < cutSize) {
    return str;
  }
  return (
    <>
      {str.slice(0, 60)}
      ...
    </>
  );
}
