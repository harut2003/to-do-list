import { Card } from "react-bootstrap";
import { formatDate } from "../../helpers/utils";
import PropTypes from "prop-types";
import { memo } from "react";

function SingleTask(props) {
  console.log(props);
  const { title, description, date } = props.task;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title.slice(0, 10)}</Card.Title>
        <Card.Text>{description} </Card.Text>
        <Card.Text>{formatDate(date)}</Card.Text>
      </Card.Body>
    </Card>
  );
}
SingleTask.propTypes = {
  task: PropTypes.object.isRequired,
};
export default memo(SingleTask);
