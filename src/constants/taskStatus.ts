import { STATUS_LABELS } from "./app";
import type { TaskStatus } from "../types/task";

export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: STATUS_LABELS.PENDING,
    className: "pending",
  },
  "in-progress": {
    label: STATUS_LABELS.IN_PROGRESS,
    className: "in-progress",
  },
  completed: {
    label: STATUS_LABELS.COMPLETED,
    className: "completed",
  },
};
