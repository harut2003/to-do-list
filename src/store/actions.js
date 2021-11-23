import request from "../helpers/request";
export function getTasks() {
  return (dispatch) => {
    request("http://localhost:3001/task").then((tasks) => {
      dispatch({ type: "GET_TASKS", tasks });
    });
  };
}

export function selectToggle(tasks, selectedTasks) {
  const taskId = tasks.map((obj) => obj._id);

  return (dispatch) => {
    if (tasks.length === selectedTasks.size) {
      dispatch({ type: "SELECT_TOGGLE", selectedTasks: new Set() });
      return;
    }
    dispatch({ type: "SELECT_TOGGLE", selectedTasks: new Set(taskId) });
  };
}

export function deleteTask(id) {
  return (dispatch) => {
    request(`http://localhost:3001/task/${id}`, "DELETE").then(() => {
      dispatch({ type: "DELETE_TASK", deletedId: id });
    });
  };
}

export function setSelectedTasks(id) {
  return (dispatch) => {
    dispatch({ type: "SET_SELECTED_TASKS", id });
  };
}

export function deleteSelectedTasks(selectedTasks, hideFunction) {
  return (dispatch) => {
    request("http://localhost:3001/task", "PATCH", {
      tasks: [...selectedTasks],
    }).then((selectedTasks) => {
      dispatch({ type: "DELETE_SELECTED_TASKS", selectedTasks });
      hideFunction();
    });
  };
}
export function addTask(newTask) {
  return (dispatch) => {
    request("http://localhost:3001/task", "POST", newTask).then((newTask) => {
      dispatch({ type: "ADD_TASK", newTask });
    });
  };
}
export function editTask(editedTask, closeModal) {
  return (dispatch) => {
    request(
      `http://localhost:3001/task/${editedTask._id}`,
      "PUT",
      editedTask
    ).then((editedTask) => {
      dispatch({ type: "EDIT_TASK", editedTask });
      closeModal();
    });
  };
}
export function visibleTaskModal() {
  return (dispatch) => {
    dispatch({ type: "VISIBLE_TASK_MODAL" });
  };
}
