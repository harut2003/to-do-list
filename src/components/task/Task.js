import { PureComponent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "./task.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, textCut } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTask, setSelectedTasks, editTask } from "../../store/actions";

class Task extends PureComponent {
  // changeStatus = () => {
  //   const newTask = { ...this.props.task };
  //   newTask.date = formatDate(newTask.date);
  //   newTask.status === "active"
  //     ? (newTask.status = "done")
  //     : (newTask.status = "active");
  //   this.props.editTask(newTask, null, "status", newTask.status);
  // };
  render() {
    const { task, disabled, selected, editedTask, deleteTask, editTask } =
      this.props;
    const { _id, title, description, date, status } = task;

    return (
      <Card className={`h-100 ${selected ? styles.selected : ""}`}>
        <Card.Body className={styles.card}>
          <div>
            <Form.Check
              onChange={() => this.props.setSelectedTasks(_id)}
              checked={selected}
            />
            <Link to={`/task/${_id}`}>
              <Card.Title>{textCut(title, _id, 20)}</Card.Title>
            </Link>

            <Card.Text>{textCut(description, _id)} </Card.Text>
          </div>

          <div className="mt-2">
            <Card.Text>Status: {status} </Card.Text>
            <Card.Text>{formatDate(date)}</Card.Text>
            {status === "active" ? (
              <Button
                onClick={() => editTask({ status: "done", _id: task._id })}
                variant="warning"
              >
                <FontAwesomeIcon icon={faClock} />
              </Button>
            ) : (
              <Button
                onClick={() => editTask({ status: "active", _id: task._id })}
                variant="success"
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            )}

            <Button
              className="ms-3"
              variant="secondary"
              onClick={() => editedTask(task)}
            >
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
            <p className={styles.created}>
              Created at {formatDate(task.created_at)}
            </p>
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
  editTask,
};

export default connect(null, mapDispatchToProps)(Task);
