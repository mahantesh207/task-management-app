import { TASK_STATUS_CONFIG } from "../../constants/taskStatus";
import type { TaskStatus } from "../../types/task";

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = TASK_STATUS_CONFIG[status];

  return (
    <span className="task-status">
      <span className={`status-dot ${className}`} />
      {label}
    </span>
  );
}
