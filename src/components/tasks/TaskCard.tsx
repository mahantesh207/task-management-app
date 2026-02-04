import type { TaskStatus } from "../../types/task";
import { StatusBadge } from "../ui";
import { ClockIcon } from "../../assets/icons/ClockIcon";
import { EditIcon } from "../../assets/icons/EditIcon";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { ARIA_LABELS } from "../../constants/app";

interface TaskCardProps {
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({
  title,
  description,
  date,
  status,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <div className="task-card" onClick={onEdit}>
      <div className="task-left">
        <div className="task-clock-wrapper">
          <ClockIcon />
        </div>

        <div className="task-info">
          <h4 className="task-title">{title}</h4>
          <p className="task-desc">{description}</p>
          <small className="task-date">{date}</small>
        </div>
      </div>

      <div className="task-right-section">
        <StatusBadge status={status} />

        <div className="task-actions">
          <button
            type="button"
            className="icon-btn edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            aria-label={ARIA_LABELS.EDIT_TASK}
          >
            <EditIcon />
          </button>

          <button
            type="button"
            className="icon-btn delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            aria-label={ARIA_LABELS.DELETE_TASK}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
