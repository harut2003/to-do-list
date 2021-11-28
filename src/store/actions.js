import request from "../helpers/request";
import * as actionTypes from "./actionTypes";
import history from "../helpers/history";

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
  const newParams = {};
  for (const key in params) {
    if (params[key]) {
      newParams[key] = params[key];
    }
  }

  const query = Object.entries(newParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task/?${query}`)
      .then((tasks) => {
        dispatch({ type: actionTypes.GET_TASKS, tasks });
        history.replace(query && "?" + query.toString());
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export const getTask = (id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task/${id}`)
      .then((singleTask) => {
        dispatch({ type: actionTypes.GET_TASK, singleTask });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
};

export function selectToggle(tasks, selectedTasks) {
  const taskId = tasks.map((obj) => obj._id);

  return (dispatch) => {
    if (tasks.length === selectedTasks.size) {
      dispatch({ type: actionTypes.SELECT_TOGGLE, selectedTasks: new Set() });
      return;
    }
    dispatch({
      type: actionTypes.SELECT_TOGGLE,
      selectedTasks: new Set(taskId),
    });
  };
}

export function deleteTask(id, from, goHome) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task/${id}`, "DELETE")
      .then(() => {
        dispatch({ type: actionTypes.DELETE_TASK, deletedId: id, from });
        goHome && goHome("/home");
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function setSelectedTasks(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_SELECTED_TASKS, id });
  };
}

export function deleteSelectedTasks(selectedTasks, hideFunction) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });

    request(`${apiHost}/task`, "PATCH", {
      tasks: [...selectedTasks],
    })
      .then((selectedTasks) => {
        dispatch({ type: actionTypes.DELETE_SELECTED_TASKS, selectedTasks });
        hideFunction();
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}
export function addTask(newTask, hideModal) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });

    request(`${apiHost}/task`, "POST", newTask)
      .then((newTask) => {
        dispatch({ type: actionTypes.ADD_TASK, newTask });
        hideModal();
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}
export function editTask(editedTask, closeModal, from) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });

    request(`${apiHost}/task/${editedTask._id}`, "PUT", editedTask)
      .then((editedTask) => {
        dispatch({ type: actionTypes.EDIT_TASK, editedTask, from });
        closeModal();
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function setFilters(key, value) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_FILTERS, key, value });
  };
}

export function clearFilters() {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_FILTERS });
  };
}
