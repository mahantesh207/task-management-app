import { useState, useMemo } from "react";
import { TaskSection } from "./";
import type { Task } from "../../types/task";
import { SEARCH_PLACEHOLDER, TASK_TITLES, ARIA_LABELS, STATUS_LABELS } from "../../constants/app";
import { SearchIcon } from "../../assets/icons/SearchIcon";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
}: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "incomplete">("all");

  const filteredByTab = useMemo(() => {
    if (activeTab === "all") return tasks;
    if (activeTab === "completed") return tasks.filter(t => t.status === "completed");
    return tasks.filter(t => t.status !== "completed");
  }, [tasks, activeTab]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return filteredByTab.filter((task) => {
      const matchesText =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      const statusLabel = STATUS_LABELS[task.status.toUpperCase().replace("-", "_") as keyof typeof STATUS_LABELS] || "";
      const matchesStatus = statusLabel.toLowerCase().includes(query);
      
      return matchesText || matchesStatus;
    });
  }, [filteredByTab, searchQuery]);

  return (
    <>
      <div className="search-wrapper">
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          className="search-input"
          placeholder={SEARCH_PLACEHOLDER}
          aria-label={ARIA_LABELS.SEARCH_INPUT}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-tabs">
        <button 
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button 
          className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button 
          className={`tab-btn ${activeTab === "incomplete" ? "active" : ""}`}
          onClick={() => setActiveTab("incomplete")}
        >
          Incomplete
        </button>
      </div>

      {(activeTab === "all" || activeTab === "incomplete") && (
        <TaskSection
          title={TASK_TITLES.IN_PROGRESS}
          status="in-progress"
          tasks={filteredTasks}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      {(activeTab === "all" || activeTab === "incomplete") && (
        <TaskSection
          title={TASK_TITLES.PENDING}
          status="pending"
          tasks={filteredTasks}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      {(activeTab === "all" || activeTab === "completed") && (
        <TaskSection
          title={TASK_TITLES.COMPLETED}
          status="completed"
          tasks={filteredTasks}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
