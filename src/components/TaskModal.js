import { func } from "prop-types";
import { PureComponent } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import idGenerator from "../helpers/idGenerator";

export default class TaskModal extends PureComponent {
  state = {
    title: "",
    description: "",
  };
  changeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = () => {
    const { getData, onClose } = this.props;
    let { title, description } = this.state;
    title = title.trim();
    if (!title) {
      return;
    }
    const newTask = {
      _id: idGenerator(),
      title,
      description,
    };
    getData(newTask);
    onClose();
  };
  confirmEnter = (e) => (e.key === "Enter" ? this.handleSubmit() : false);

  render() {
    const { onClose } = this.props;
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              onChange={this.changeInput}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
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
TaskModal.propTypes = {
  onClose: func.isRequired,
  getData: func.isRequired,
};
