import request from "../helpers/request";
import * as actionTypes from "./actionTypes";
import history from "../helpers/history";
import requestWithoutToken from "../helpers/auth";

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
        if (!tasks) return;
        dispatch({ type: actionTypes.GET_TASKS, tasks });
        if (!query) {
          history.replace("/home");
          return;
        }
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
        if (!singleTask) return;
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

export function deleteTask(id, from) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });
    request(`${apiHost}/task/${id}`, "DELETE")
      .then((res) => {
        if (!res) return;
        dispatch({ type: actionTypes.DELETE_TASK, deletedId: id, from });
        from === "single" && history.push("/home");
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
        if (!selectedTasks) return;
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
        if (!newTask) return;
        dispatch({ type: actionTypes.ADD_TASK, newTask });
        hideModal();
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}
export function editTask(task, closeModal, from) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });

    request(`${apiHost}/task/${task._id}`, "PUT", task)
      .then((editedTask) => {
        if (!editedTask) return;
        dispatch({
          type: actionTypes.EDIT_TASK,
          editedTask,
          from,
          status: task.status,
        });
        closeModal && closeModal();
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
    history.push({
      search: "",
    });
    dispatch({ type: actionTypes.CLEAR_FILTERS });
  };
}

export function register(user) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });

    requestWithoutToken(`${apiHost}/user`, "POST", user)
      .then(() => {
        dispatch({ type: actionTypes.REGISTER });
        history.push("/sign-in");
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}
export function login(user) {
  return (dispatch) => {
    dispatch({ type: actionTypes.PENDING });

    requestWithoutToken(`${apiHost}/user/sign-in`, "POST", user)
      .then((token) => {
        dispatch({ type: actionTypes.LOGIN });
        localStorage.setItem("token", JSON.stringify(token));
        // history.push("/home");
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

// export function getUser() {
//   return (dispatch) => {
//     request(`${apiHost}/user/`)
//       .then((user) => {
//         console.log(user);
//         dispatch({ type: actionTypes.USER, user });
//         //localStorage.setItem("token", JSON.stringify(token));
//         // history.push("/home");
//       })
//       .catch((err) => {
//         dispatch({ type: actionTypes.ERROR, error: err.message });
//       });
//   };
// }
