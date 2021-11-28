import { PureComponent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "./task.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { formatDate, textCut } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTask, setSelectedTasks } from "../../store/actions";
class Task extends PureComponent {
  render() {
    const { task, disabled, selected, editedTask, deleteTask } = this.props;
    const { _id, title, description, date } = task;
    return (
      <Card className={`h-100 ${selected ? styles.selected : ""}`}>
        <Card.Body className={styles.card}>
          <div>
            <Form.Check
              onChange={() => this.props.setSelectedTasks(_id)}
              checked={selected}
            />
            <Link to={`/task/${_id}`}>
              <Card.Title>{title.slice(0, 10)}</Card.Title>
            </Link>

            <Card.Text>{textCut(description, _id)} </Card.Text>
          </div>

          <div className="mt-2">
            <Card.Text>{formatDate(date)}</Card.Text>
            <Button variant="warning" onClick={() => editedTask(task)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              disabled={disabled}
              variant="danger"
              onClick={() => deleteTask(_id)}
              className="ms-3"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  editedTask: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteTask,
  setSelectedTasks,
};

export default connect(null, mapDispatchToProps)(Task);
