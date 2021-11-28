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
  searchingParams: defaultSearchingParams,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.PENDING: {
      return {
        ...state,
        isLoading: true,
        successMessage: "",
        errorMessage: "",
        singleTask: null,
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
      if (action.from === "single") {
        return {
          ...state,
          singleTask: editedTask,
          isLoading: false,
          successMessage: "Task edited successfully",
        };
      }
      const tasks = [...state.tasks];
      const editedIndex = tasks.findIndex((obj) => obj._id === editedTask._id);
      tasks[editedIndex] = editedTask;
      return {
        ...state,
        tasks,
        isLoading: false,
        successMessage: "Task edited successfully",
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

    default:
      return state;
  }
}

export default reducer;
