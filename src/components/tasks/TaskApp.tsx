import { useState } from "react";
import { v4 as uuid } from "uuid";
import { TaskList, TaskForm } from "./";
import { PageLayout } from "../layout";
import { FloatingButton, ConfirmModal } from "../ui";
import { useTasks } from "../../hooks";
import { APP_MODES, FORM_LABELS, APP_TITLE, CONFIRM_MODAL } from "../../constants/app";
import type { Task } from "../../types/task";

export function TaskApp() {
  const [mode, setMode] = useState<typeof APP_MODES[keyof typeof APP_MODES]>(
    APP_MODES.LIST
  );
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const { tasks, dispatch } = useTasks();

  const handleCancel = () => {
    setEditingTask(null);
    setMode(APP_MODES.LIST);
  };

  const handleSubmit = (data: Omit<Task, "id" | "createdAt">) => {
    if (mode === APP_MODES.ADD) {
      dispatch({
        type: "ADD",
        payload: { id: uuid(), createdAt: new Date().toDateString(), ...data },
      });
    } else if (mode === APP_MODES.EDIT && editingTask) {
      dispatch({
        type: "UPDATE",
        payload: { ...editingTask, ...data },
      });
    }
    setEditingTask(null);
    setMode(APP_MODES.LIST);
  };

  if (mode === APP_MODES.LIST) {
    return (
      <PageLayout 
        title={APP_TITLE} 
        fab={<FloatingButton onClick={() => {
          setEditingTask(null);
          setMode(APP_MODES.ADD);
        }} />}
      >
        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setEditingTask(task);
            setMode(APP_MODES.EDIT);
          }}
          onDelete={(id) => setDeletingTaskId(id)}
        />
        {deletingTaskId && (
          <ConfirmModal
            title={CONFIRM_MODAL.DELETE_TITLE}
            message={CONFIRM_MODAL.DELETE_MESSAGE}
            confirmLabel={CONFIRM_MODAL.CONFIRM_DELETE}
            cancelLabel={CONFIRM_MODAL.CANCEL}
            onConfirm={() => {
              dispatch({ type: "DELETE", payload: deletingTaskId });
              setDeletingTaskId(null);
            }}
            onCancel={() => setDeletingTaskId(null)}
          />
        )}
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={mode === APP_MODES.ADD ? FORM_LABELS.ADD_TASK : FORM_LABELS.EDIT_TASK}
      onBack={handleCancel}
    >
      <TaskForm
        initialTask={editingTask || undefined}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageLayout>
  );
}
