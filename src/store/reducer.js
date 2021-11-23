const defaultState = {
  tasks: [],
  selectedTasks: new Set(),
  toggleAddTaskModal: false,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_TASKS": {
      return {
        ...state,
        tasks: action.tasks,
      };
    }
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.newTask],
      };
    }
    case "DELETE_TASK": {
      const delArr = state.tasks.filter((i) => i._id !== action.deletedId);
      return {
        ...state,
        tasks: delArr,
      };
    }
    case "EDIT_TASK": {
      const { editedTask } = action;
      console.log("reducer", editedTask);
      const editedTasks = [...state.tasks];
      const editedIndex = editedTasks.findIndex(
        (obj) => obj._id === editedTask._id
      );
      editedTasks[editedIndex] = editedTask;
      return {
        ...state,
        tasks: editedTasks,
      };
    }
    case "SET_SELECTED_TASKS": {
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
    case "DELETE_SELECTED_TASKS": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => !state.selectedTasks.has(task._id)),
        selectedTasks: new Set(),
      };
    }
    case "SELECT_TOGGLE": {
      return {
        ...state,
        selectedTasks: action.selectedTasks,
      };
    }
    case "VISIBLE_TASK_MODAL": {
      console.log("VISIBLe");
      return {
        ...state,
        toggleAddTaskModal: !state.toggleAddTaskModal,
      };
    }
    default:
      return state;
  }
}

export default reducer;
