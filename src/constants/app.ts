export const APP_TITLE = "Todo App";
export const APP_MODES = {
  LIST: "list",
  ADD: "add",
  EDIT: "edit",
} as const;
export const SEARCH_PLACEHOLDER = "Search To-Do";

export const TASK_TITLES = {
  IN_PROGRESS: "In Progress",
  PENDING: "Pending",
  COMPLETED: "Completed",
};

export const STATUS_LABELS = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const FORM_LABELS = {
  TITLE_PLACEHOLDER: "Enter the title",
  DESC_PLACEHOLDER: "Enter the description",
  ADD_TASK: "Add Task",
  EDIT_TASK: "Edit Task",
  CANCEL_BTN: "CANCEL",
  UPDATE_BTN_TEXT: "UPDATE",
  ADD_BTN_TEXT: "ADD",
};

export const ARIA_LABELS = {
  SEARCH_INPUT: "Search tasks",
  BACK_BTN: "Go back",
  ADD_FAB: "Add Task",
  EDIT_TASK: "Edit task",
  DELETE_TASK: "Delete task",
};

export const CONFIRM_MODAL = {
  DELETE_TITLE: "Delete Task",
  DELETE_MESSAGE: "Are you sure you want to delete this task? This action cannot be undone.",
  CONFIRM_DELETE: "DELETE",
  CANCEL: "CANCEL",
};
