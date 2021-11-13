import { Component } from "react";
import { Button, FormControl, Col, Card, Form } from 'react-bootstrap';
export default class Task extends Component {
    constructor(props) {
        super(props);
        this.task = props.task;
        this._id = props.key;
        this.editItem = props.editItem;
        this.onEdit = props.onEdit;
    }
    render() {
        const { task, _id, onEdit } = this;
        console.log(task);
        return (
            <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >

                <Card className="mb-3">

                    <Card.Body>
                        <Form.Check onChange={() => this.changeCheck(_id)} />
                        <Card.Title>{task.title.slice(0, 10)}</Card.Title>
                        <Card.Text>
                            {onEdit ? <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={task.title}
                                onChange={(e) => this.changeEditInput(e, _id)}
                                className="ps-1"
                                onKeyUp={(e) => e.key === "Enter" ? this.editItem(_id, false) : false}
                            /> : task.title}
                        </Card.Text>
                        <Button variant="danger" onClick={() => this.deleteItem(_id)} className="me-3">Delete</Button>
                        {onEdit ? <Button variant="success" onClick={() => this.editItem(_id, false)}>Confirm</Button> :
                            <Button variant="warning" onClick={() => this.editItem(_id, true)}>Edit</Button>}

                    </Card.Body>
                </Card>
            </Col>
        )
    }
}