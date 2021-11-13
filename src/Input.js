import { Component } from "react";
import { Button, InputGroup, FormControl, Container, Row, Col, Card, Form } from 'react-bootstrap';
import idGenerator from "./idGenerator"
import Task from "./Task";
//import "./stylesheets/test.css";
export default class Input extends Component {
    state = {
        inputText: "",
        tasks: [],
        selectedTasks: new Set(),
        removeAllButton: false,

    }
    changeInput = (e, stateValue) => {
        this.setState({
            [stateValue]: e.target.value
        })
    }
    addText = () => {

        let { inputText, tasks } = this.state;
        inputText = inputText.trim();
        if (!inputText) return;
        const newTask = {
            _id: idGenerator(),
            title: inputText,

            checked: false
        }
        this.setState({
            tasks: [...tasks, newTask],
            editValue: inputText,
            inputText: ""
        });

    }
    editItem = (id, bool) => {

        const { tasks } = this.state;
        console.log(tasks);
        const editTasks = tasks.map(obj => {
            if (obj._id === id) {
                obj.onEdit = bool;
            }
            return obj;
        });
        this.setState({
            tasks: editTasks
        });
    }
    deleteItem = (id) => {
        const { tasks } = this.state;
        const delArr = tasks.filter(i => i._id !== id);
        this.setState({ tasks: delArr });
    }
    changeEditInput = (e, id) => {
        const { tasks } = this.state;

        const editValue = tasks.map(obj => {
            if (obj._id === id) {
                obj.title = e.target.value;
            }
            return obj;
        });
        this.setState({
            tasks: editValue
        })
    }
    changeCheck = (id) => {
        const { selectedTasks } = this.state;
        this.setState({
            tasks: this.state.tasks.map(obj => {
                if (obj._id === id) {
                    obj.checked = !obj.checked;
                    if (obj.checked) {
                        selectedTasks.add(obj);

                    }
                    else {
                        selectedTasks.delete(obj);
                    }
                    this.setState({
                        selectedTasks: selectedTasks
                    })
                    if (selectedTasks.size === 1) {
                        this.setState({
                            removeAllButton: true
                        });
                    }
                    else if (selectedTasks.size < 1) {
                        this.setState({
                            removeAllButton: false
                        });
                    }
                }
                return obj;
            })
        });
    }
    removeSelected = () => {
        this.setState({
            tasks: this.state.tasks.filter(obj => !obj.checked),
            removeAllButton: false,
            selectedTasks: new Set()
        });
    }
    render() {

        const { inputText, tasks, removeAllButton } = this.state;

        return (
            <>
                <Container className="mt-3">
                    <Row>
                        <Col>
                            <InputGroup>
                                <FormControl
                                    placeholder="Task's name"
                                    aria-label="Task's name"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => {
                                        this.changeInput(e, "inputText");
                                    }}
                                    value={inputText}
                                    onKeyUp={(e) => e.key === "Enter" ? this.addText() : false}
                                />
                                <Button onClick={this.addText} variant="outline-secondary" id="button-addon2">
                                    Add task
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {tasks.map((task) => {
                            return (
                                <Task task={task} key={idGenerator()} editItem={this.editItem} onEdit={false} />
                            );
                        })}


                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={6}>
                            {removeAllButton && <Button className="me-3 w-100" onClick={this.removeSelected} variant="danger">Remove Selected</Button>}
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}


