import { Link } from "react-router-dom";
export function formatDate(date) {
  return date.toString().slice(0, 10);
}
export function textCut(str = "", taskId, cutSize = 60) {
  if (str.length < cutSize) {
    return str;
  }
  return (
    <>
      {str.slice(0, 60)}
      <Link className="font-weight-bold" to={`/task/${taskId}`}>
        ...
      </Link>
    </>
  );
}
