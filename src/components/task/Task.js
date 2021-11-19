import { PureComponent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "./task.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../helpers/utils";
import { Link } from "react-router-dom";
export default class Task extends PureComponent {
  checkTask = () => {
    const { changeCheck, task } = this.props;
    changeCheck(task._id);
  };
  // changeEditInput = (e) => {
  //   this.setState({
  //     description: e.target.value,
  //   });
  // };
  // editItem = (newTask) => {
  //   let { description } = this.state;
  //   description = description.trim();

  //   if (!description) {
  //     return;
  //   }
  //   this.setState({
  //     showModal: bool,
  //   });
  // };
  render() {
    const { task, disabled, deleteItem, selected, editedTask } = this.props;
    const { _id, title, description, date } = task;
    return (
      <Card className={`mb-3 ${selected ? styles.selected : ""}`}>
        <Card.Body>
          <Form.Check onChange={this.checkTask} checked={selected} />
          <Link to="/task" onClick={() => console.log(1)}>
            <Card.Title>{title.slice(0, 10)}</Card.Title>
          </Link>

          <Card.Text>{description} </Card.Text>
          <Card.Text>{formatDate(date)}</Card.Text>
          <Button variant="warning" onClick={() => editedTask(task)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            disabled={disabled}
            variant="danger"
            onClick={() => deleteItem(_id)}
            className="ms-3"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
Task.propTypes = {
  task: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  editedTask: PropTypes.func.isRequired,
};
