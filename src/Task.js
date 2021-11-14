import { Component } from "react";
import { Button, FormControl, Card, Form } from 'react-bootstrap';
import styles from './stylesheets/task.module.css'
export default class Task extends Component {
    state = {
        isSelected: false,
        description: this.props.task.title,
        onEdit: false
    };
    checkTask = () => {
        const { changeCheck, task } = this.props;
        changeCheck(task._id);
        this.setState({
            isSelected: !this.state.isSelected
        });
    };
    changeEditInput = (e, id) => {
        this.setState({
            description: e.target.value
        });
    };
    editItem = (bool) => {
        this.setState({
            onEdit: bool
        })
    }
    render() {

        const { task, disabled, deleteItem } = this.props;
        const { _id } = task;
        const { isSelected, description, onEdit } = this.state;
        return (


            <Card className={`mb-3 ${isSelected ? styles.selected : ''}`} >
                <Card.Body>
                    <Form.Check onClick={this.checkTask} />
                    <Card.Title>{description.slice(0, 10)}</Card.Title>
                    <Card.Text>
                        {onEdit ? <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            value={description}
                            onChange={(e) => this.changeEditInput(e, _id)}
                            className="ps-1"
                            onKeyUp={(e) => e.key === "Enter" ? this.editItem(false) : false}
                        /> : description}
                    </Card.Text>
                    <Button disabled={disabled} variant="danger" onClick={() => deleteItem(_id)} className="me-3">Delete</Button>
                    {onEdit ? <Button variant="success" onClick={() => this.editItem(false)}>Confirm</Button> :
                        <Button variant="warning" onClick={() => this.editItem(true)}>Edit</Button>}

                </Card.Body>
            </Card>
        )
    }
}