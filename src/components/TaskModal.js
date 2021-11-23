import { createRef, PureComponent } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { formatDate } from "../helpers/utils";
import "react-datepicker/dist/react-datepicker.css";
import { addTask, visibleTaskModal } from "../store/actions";
import { connect } from "react-redux";
class TaskModal extends PureComponent {
  constructor(props) {
    super(props);

    this.inputFocus = createRef();
    this.descFocus = createRef();
  }
  state = {
    title: "",
    description: "",
    date: new Date(),
  };
  componentDidMount() {
    this.inputFocus.current.focus();
  }
  changeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = () => {
    let { title, description, date } = this.state;
    title = title.trim();
    if (!title) {
      return;
    }
    const newTask = {
      title,
      description,
      date: formatDate(date.toISOString()),
    };
    this.props.visibleTaskModal();
    this.props.addTask(newTask);
  };
  handleChangeDate = (e) => {
    this.setState({
      date: e || new Date(),
    });
  };
  confirmEnter = (e) => e.key === "Enter" && this.descFocus.current.focus();

  render() {
    return (
      <Modal show={true} onHide={visibleTaskModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              onChange={this.changeInput}
              onKeyPress={this.confirmEnter}
              ref={this.inputFocus}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              onChange={this.changeInput}
              ref={this.descFocus}
            />
          </Form.Group>
          <DatePicker
            minDate={new Date()}
            selected={this.state.date}
            onChange={this.handleChangeDate}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={visibleTaskModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.handleSubmit}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
// const mapStateToProps = ({ task }) => {};

const mapDispatchToProps = {
  addTask,
  visibleTaskModal,
};

export default connect(null, mapDispatchToProps)(TaskModal);
