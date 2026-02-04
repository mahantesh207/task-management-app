import { useReducer, useEffect } from "react";
import type { Task } from "../types/task";

type Action =
  | { type: "ADD"; payload: Task }
  | { type: "UPDATE"; payload: Task }
  | { type: "DELETE"; payload: string };

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "UPDATE":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );

    case "DELETE":
      return state.filter((task) => task.id !== action.payload);

    default:
      return state;
  }
}

function init(): Task[] {
  try {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load tasks from local storage", error);
    return [];
  }
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(reducer, [], init);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, dispatch };
}
