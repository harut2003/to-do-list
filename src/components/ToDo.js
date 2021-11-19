import { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import EditTaskModal from "./EditTaskModal";
import Task from "./task/Task";
import ModalRemove from "./ModalRemove";
import TaskModal from "./TaskModal";

//import "./stylesheets/test.css";
export default class ToDo extends Component {
  state = {
    tasks: [],
    selectedTasks: new Set(),
    show: false,
    isVisibleModal: false,
    editedTask: null,
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
  componentDidMount() {
    fetch("http://localhost:3001/task")
      .then(async (res) => {
        const result = await res.json();
        if (res.status >= 400) {
          if (result.error) {
            throw result.error;
          } else {
            throw new Error("Something went wrong");
          }
        }
        this.setState({
          tasks: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // request = (fetch, stateKey, stateValue, fetchBody) => {
  //     fetch("http://localhost:3001/task", fetchBody).then(async (res) => {
  //         const result = await res.json();
  //         if (res.status >= 400) {
  //             if (result.error) {
  //                 throw result.error;
  //             } else {
  //                 throw new Error("Something went wrong");
  //             }
  //         }
  //         this.setState({
  //             stateKey: stateValue,
  //         });
  //     })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  // }
  addTask = (newTask) => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status >= 400) {
          if (result.error) {
            throw result.error;
          } else {
            throw new Error("Something went wrong");
          }
        }
        const { tasks } = this.state;
        this.setState({
          tasks: [...tasks, result],
          isVisibleModal: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteItem = (id) => {
    fetch(`http://localhost:3001/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status >= 400) {
          if (result.error) {
            throw result.error;
          } else {
            throw new Error("Something went wrong");
          }
        }
        const delArr = this.state.tasks.filter((i) => i._id !== id);
        this.setState({ tasks: delArr });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeCheck = (id) => {
    const selectedTasks = new Set([...this.state.selectedTasks]);
    if (!selectedTasks.has(id)) {
      selectedTasks.add(id);
    } else {
      selectedTasks.delete(id);
    }
    this.setState({
      selectedTasks,
      tasks: [...this.state.tasks],
    });
  };
  removeSelected = () => {
    const { tasks, selectedTasks } = this.state;
    fetch(`http://localhost:3001/task/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: [...selectedTasks] }),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status >= 400) {
          if (result.error) {
            throw result.error;
          } else {
            throw new Error("Something went wrong");
          }
        }

        this.setState({
          tasks: tasks.filter((task) => !selectedTasks.has(task._id)),
          selectedTasks: new Set(),
          show: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleToggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  selectToggle = () => {
    const { tasks, selectedTasks } = this.state;
    const taskId = tasks.map((obj) => obj._id);
    if (tasks.length === selectedTasks.size) {
      this.setState({
        selectedTasks: new Set(),
      });
      return;
    }
    this.setState({
      selectedTasks: new Set(taskId),
    });
  };
  showTaskModal = () => {
    this.setState({
      isVisibleModal: !this.state.isVisibleModal,
    });
  };
  closeEditTaskModal = (editedTask) => {
    this.setState({
      editedTask,
    });
  };
  addEditedTask = (editedTask) => {
    fetch(`http://localhost:3001/task/${editedTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status >= 400) {
          if (result.error) {
            throw result.error;
          } else {
            throw new Error("Something went wrong");
          }
        }
        const editedTasks = [...this.state.tasks];
        const editedIndex = editedTasks.findIndex(
          (obj) => obj._id === editedTask._id
        );
        editedTasks[editedIndex] = editedTask;
        this.setState({
          tasks: editedTasks,
          editedTask: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { tasks, selectedTasks, show, isVisibleModal, editedTask } =
      this.state;
    const selectUn = tasks.length === selectedTasks.size;
    return (
      <Container className="mt-3">
        <Row>
          <Col>
            <Button
              className="w-100"
              onClick={this.showTaskModal}
              variant="success"
              id="button-addon2"
            >
              Add task
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            {!!selectedTasks.size && tasks.length > 1 && (
              <Button
                className="w-25 mt-3"
                variant={selectUn ? "secondary" : "warning"}
                onClick={this.selectToggle}
              >
                {selectUn ? "Deselect All" : "Select All"}{" "}
              </Button>
            )}
          </Col>
        </Row>
        <Row className="mt-3">
          {tasks.map((task) => {
            return (
              <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                <Task
                  task={task}
                  editedTask={this.closeEditTaskModal}
                  deleteItem={this.deleteItem}
                  changeCheck={this.changeCheck}
                  disabled={!!selectedTasks.size}
                  selected={selectedTasks.has(task._id)}
                />
              </Col>
            );
          })}
        </Row>
        <Row className="justify-content-center">
          <Col xs={6}>
            {!!selectedTasks.size && (
              <Button
                className="me-3 w-100"
                onClick={this.handleToggle}
                variant="danger"
              >
                Remove Selected ({selectedTasks.size})
              </Button>
            )}
          </Col>
        </Row>
        <ModalRemove
          count={selectedTasks.size}
          show={show}
          hideFunction={this.handleToggle}
          removeFunction={this.removeSelected}
        />

        {isVisibleModal ? (
          <TaskModal getData={this.addTask} onClose={this.showTaskModal} />
        ) : null}
        {editedTask ? (
          <EditTaskModal
            task={editedTask}
            onClose={() => this.closeEditTaskModal(null)}
            addTask={this.addEditedTask}
          />
        ) : null}
      </Container>
    );
  }
}
