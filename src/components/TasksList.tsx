import {useCallback, useMemo, useState} from "react";
import styles from "./TasksList.module.scss";

import TaskItem from "./TaskItem";
import TaskForm, { type TaskFormData } from "./TaskForm";
import { useTasks } from "../hooks/useTasks";
import { type Task, Status } from "../types/task";


export default function TasksList() {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [selectedStatus, setSelectedStatus] = useState<Status | "all">("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter tasks by status
  const filteredTasks = useMemo(() => {
    if (selectedStatus === "all") {
      return tasks;
    }
    return tasks.filter(task => task.status === selectedStatus);
  }, [tasks, selectedStatus])

  // Filter handler
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as Status | "all");
  };

  // Start editing (DO NOT update here)
  const handleStartEdit = (task: Task) => {
    setEditingTask(task);
  };

  // Create OR update task
  const handleSubmit = (data: TaskFormData) => {
    if (editingTask) {
      updateTask({
        ...editingTask,
        ...data,
      });
      setEditingTask(null);
    }
    else {
      createTask({
        id: crypto.randomUUID(),
        title: data.title,
        status: data.status,
        createdAt: new Date().toISOString(),
      });
    }
  };

  // Handle delete task
  const handleDelete = useCallback((id: string) => {
    deleteTask(id);

    // Safety: if deleting the task currently being edited
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }, [deleteTask, setEditingTask]);

  if (isLoading) return <p>Loading tasks…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.content}>
      <div>
        {/* FILTER + COUNT */}
        <div className={styles.filter}>
          <div className="filterGroup">
            <label htmlFor="filter">Show Tasks:</label>
            <select
              id="filter"
              value={selectedStatus}
              onChange={handleFilterChange}
            >
              <option value="all">All Tasks</option>
              {Object.values(Status).map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.count}>
            {filteredTasks.length
              ? `Showing ${filteredTasks.length} task${
                filteredTasks.length !== 1 ? "s" : ""
              }`
              : "No Tasks Available"}
          </div>
        </div>

        {/* TASK LIST */}
        <div className={styles.tasks}>
          {filteredTasks.length ? (
            filteredTasks.map(task => (
              <TaskItem
                task={task}
                key={task.id}
                onEdit={handleStartEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            "No Tasks Created."
          )}
        </div>
      </div>

      {/* FORM */}
      <TaskForm
        initialData={editingTask ?? undefined}
        onSubmit={handleSubmit}
        onCancel={() => setEditingTask(null)}
      />
    </div>
  );
}
