import { useState, useEffect } from "react";
import { TaskCard } from "./";
import { ChevronDownIcon } from "../../assets/icons/ChevronDownIcon";
import type { Task, TaskStatus } from "../../types/task";

interface TaskSectionProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskSection({
  title,
  status,
  tasks,
  onEdit,
  onDelete,
}: TaskSectionProps) {
  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  const [open, setOpen] = useState(filteredTasks.length > 0);

  useEffect(() => {
    if (filteredTasks.length > 0) {
      setOpen(true);
    }
  }, [filteredTasks.length]);

  return (
    <div className="section">
      <div
        className="section-header"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="section-header-title">
          {title} ({filteredTasks.length})
        </span>

        <ChevronDownIcon
          className={`accordion-arrow ${open ? "open" : ""}`}
        />
      </div>

      {open &&
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.createdAt}
            status={task.status}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
    </div>
  );
}
