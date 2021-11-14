import { Component } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';

import Task from "./Task";
import ModalRemove from "./ModalRemove";
import Input from "./Input"
//import "./stylesheets/test.css";
export default class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        show: false
    };
    // editItem = (id, bool) => {

    //     const { tasks } = this.state;
    //     console.log(tasks);
    //     const editTasks = tasks.map(obj => {
    //         if (obj._id === id) {
    //             obj.onEdit = bool;
    //         }
    //         return obj;
    //     });
    //     this.setState({
    //         tasks: editTasks
    //     });
    // };
    addTask = (newTask) => {
        const { tasks } = this.state;

        this.setState({
            tasks: [...tasks, newTask],
        });
    }
    deleteItem = (id) => {
        const { tasks } = this.state;
        const delArr = tasks.filter(i => i._id !== id);
        this.setState({ tasks: delArr });
    };

    changeCheck = (id) => {
        const selectedTasks = new Set([...this.state.selectedTasks]);
        if (!selectedTasks.has(id)) {
            selectedTasks.add(id);
        }
        else {
            selectedTasks.delete(id);
        }
        this.setState({
            selectedTasks,
            tasks: [...this.state.tasks]
        });

    };
    removeSelected = () => {
        const { tasks, selectedTasks } = this.state;
        this.setState({
            tasks: tasks.filter(task => !selectedTasks.has(task._id)),
            selectedTasks: new Set()
        });
        this.handleClose();
    };
    handleShow = () => {
        this.setState({
            show: true
        })
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    render() {

        const { tasks, selectedTasks, show } = this.state;

        return (
            <>
                <Container className="mt-3">
                    <Row>
                        <Col>
                            <Input value={this.addTask} />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {tasks.map((task) => {
                            console.log("input", selectedTasks);
                            return (
                                <Col
                                    key={task._id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                >
                                    <Task task={task}
                                        deleteItem={this.deleteItem}
                                        changeCheck={this.changeCheck}
                                        disabled={!!selectedTasks.size}
                                    />
                                </Col>
                            );
                        })}


                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={6}>
                            {!!selectedTasks.size && <Button className="me-3 w-100" onClick={this.handleShow} variant="danger">Remove Selected ({selectedTasks.size})</Button>}
                        </Col>
                    </Row>
                    <ModalRemove show={show} hideFunction={this.handleClose} removeFunction={this.removeSelected} />


                </Container>
            </>
        );
    }
}


