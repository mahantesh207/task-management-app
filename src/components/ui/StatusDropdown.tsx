import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../../assets/icons/ChevronDownIcon";
import type { TaskStatus } from "../../types/task";
import { TASK_STATUS_CONFIG } from "../../constants/taskStatus";

interface StatusDropdownProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

export function StatusDropdown({
  value,
  onChange,
}: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="status-dropdown" ref={dropdownRef}>
      <div
        className="status-selected"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={`status-dot ${value}`} />
        {TASK_STATUS_CONFIG[value].label}
        <ChevronDownIcon
          className={`arrow ${open ? "open" : ""}`}
        />
      </div>

      {open && (
        <div className="status-menu">
          {(Object.entries(TASK_STATUS_CONFIG) as [TaskStatus, typeof TASK_STATUS_CONFIG[TaskStatus]][]).map(
            ([key, config]) => (
              <div
                key={key}
                className={`status-item ${
                  value === key ? "active" : ""
                }`}
                onClick={() => {
                  onChange(key as TaskStatus);
                  setOpen(false);
                }}
              >
                <span className={`status-dot ${key}`} />
                {config.label}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
