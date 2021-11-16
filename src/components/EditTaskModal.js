import { PureComponent } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default class TaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props.task,
    };
  }

  changeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = () => {
    const { addTask } = this.props;
    let { title, description, _id } = this.state;
    title = title.trim();
    if (!title) {
      return;
    }
    const editedTask = {
      _id,
      title,
      description,
    };
    addTask(editedTask);
  };

  // confirmEnter = (e) => (e.key === "Enter" ? this.handleSubmit() : false);
  render() {
    const { onClose } = this.props;
    const { title, description } = this.state;
    return (
      <Modal show={true} onHide={onClose} centered>
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
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              onChange={this.changeInput}
              value={description}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.handleSubmit}>
            Edit Task
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
TaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  addTask: PropTypes.func.isRequired,
};
