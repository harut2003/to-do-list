import {func} from "prop-types";
import {PureComponent} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {formatDate} from "../helpers/utils"
import "react-datepicker/dist/react-datepicker.css";

export default class TaskModal extends PureComponent {
    state = {
        title: "",
        description: "",
        date: new Date()
    };
    changeInput = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };
    handleSubmit = () => {
        const {getData} = this.props;
        let {title, description, date} = this.state;
        title = title.trim();
        if (!title) {
            return;
        }
        const newTask = {
            title,
            description,
            date: formatDate(date.toISOString())
        };
        getData(newTask);
    };
    handleChangeDate = (e) => {
        this.setState({
                date: e || new Date()
            }
        );
    };
    confirmEnter = (e) => (e.key === "Enter" ? this.handleSubmit() : false);

    render() {
        const {onClose} = this.props;
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
                    <DatePicker minDate={new Date()} selected={this.state.date} onChange={this.handleChangeDate}/>
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
