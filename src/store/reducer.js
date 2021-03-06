import { checkAuthentication } from "../helpers/auth";
import * as actionTypes from "./actionTypes";

const defaultSearchingParams = {
  sort: null,
  search: "",
  create_lte: null,
  create_gte: null,
  complete_lte: null,
  complete_gte: null,
  status: null,
};

const defaultState = {
  tasks: [],
  selectedTasks: new Set(),
  toggleAddTaskModal: false,
  singleTask: null,
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  isSuccessContact: false,
  searchingParams: defaultSearchingParams,
  isAuthenticated: checkAuthentication(),
  user: null,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.PENDING: {
      return {
        ...state,
        isLoading: true,
        successMessage: "",
        errorMessage: "",
        isSuccessContact: false
      };
    }
    case actionTypes.GET_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
        isLoading: false,
      };
    }
    case actionTypes.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.newTask],
        isLoading: false,
        toggleAddTaskModal: false,
        successMessage: "Task added successfully",
      };
    }
    case actionTypes.DELETE_TASK: {
      if (action.type === "single") {
        return {
          ...state,
          singleTask: null,
          isLoading: false,
          successMessage: "Task deleted successfully",
        };
      }
      const delArr = state.tasks.filter((i) => i._id !== action.deletedId);
      return {
        ...state,
        tasks: delArr,
        isLoading: false,
        successMessage: "Task deleted successfully",
      };
    }
    case actionTypes.EDIT_TASK: {
      const { editedTask } = action;
      let successMessage = `Task edited successfully`;
      if (action.status) {
        successMessage = `Task is ${action.status}`;
      }
      if (action.from === "single") {
        return {
          ...state,
          singleTask: editedTask,
          isLoading: false,
          successMessage,
        };
      }

      const tasks = [...state.tasks];
      const editedIndex = tasks.findIndex((obj) => obj._id === editedTask._id);
      tasks[editedIndex] = editedTask;
      return {
        ...state,
        tasks,
        isLoading: false,
        successMessage,
      };
    }
    case actionTypes.SET_SELECTED_TASKS: {
      const selectedTasks = new Set(...[state.selectedTasks]);
      const { id } = action;
      if (!selectedTasks.has(id)) {
        selectedTasks.add(id);
      } else {
        selectedTasks.delete(id);
      }
      return {
        ...state,
        selectedTasks,
      };
    }
    case actionTypes.DELETE_SELECTED_TASKS: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => !state.selectedTasks.has(task._id)),
        selectedTasks: new Set(),
        isLoading: false,
        successMessage: "Tasks deleted successfully",
      };
    }
    case actionTypes.SELECT_TOGGLE: {
      return {
        ...state,
        selectedTasks: action.selectedTasks,
      };
    }
    case actionTypes.VISIBLE_TASK_MODAL: {
      return {
        ...state,
        toggleAddTaskModal: !state.toggleAddTaskModal,
      };
    }
    case actionTypes.GET_TASK: {
      return {
        ...state,
        singleTask: action.singleTask,
        isLoading: false,
      };
    }
    case actionTypes.USER: {
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    }
    case actionTypes.CHANGE_USER: {
      return {
        ...state,
        user: action.user,
        successMessage: "You have successfully changed your data",
        isLoading: false,
      };
    }
    case actionTypes.ERROR: {
      return {
        ...state,
        errorMessage: action.error,
        isLoading: false,
      };
    }
    case actionTypes.SET_FILTERS: {
      // const temp = state.searchingParams;
      // temp[action.key] = action.value;
      const { key, value } = action;
      return {
        ...state,
        searchingParams: Object.assign(
          { ...state.searchingParams },
          { [key]: value }
        ),
      };
    }
    case actionTypes.CLEAR_FILTERS: {
      return {
        ...state,
        searchingParams: defaultSearchingParams,
      };
    }
    case actionTypes.CONTACT: {
      return {
        ...state,
        isLoading: false,
        isSuccessContact: true,
      };
    }
    case actionTypes.REGISTER: {
      return {
        ...state,
        isLoading: false,
        successMessage: "You have successfully registered",
      };
    }

    case actionTypes.LOGIN: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    }
    case actionTypes.LOGOUT: {
      return {
        ...defaultState,
        isLoading: false,
        isAuthenticated: false,
      };
    }
    case actionTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        isLoading: false,
        successMessage: "You have successfully changed your password",
      };
    }
    default:
      return state;
  }
}

export default reducer;
