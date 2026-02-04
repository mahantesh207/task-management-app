import { useState } from "react";
import type { Task, TaskStatus } from "../../types/task";
import { StatusDropdown } from "../ui";
import { FORM_LABELS } from "../../constants/app";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialTask?.status ?? "pending"
  );

  const isEdit = Boolean(initialTask);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <div className="task-form">
      <div className="form-field">
        <input
          placeholder={FORM_LABELS.TITLE_PLACEHOLDER}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          placeholder={FORM_LABELS.DESC_PLACEHOLDER}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {isEdit && (
        <div className="form-field">
          <StatusDropdown value={status} onChange={setStatus} />
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          {FORM_LABELS.CANCEL_BTN}
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!title.trim()}
        >
          {isEdit ? FORM_LABELS.UPDATE_BTN_TEXT : FORM_LABELS.ADD_BTN_TEXT}
        </button>
      </div>
    </div>
  );
}
