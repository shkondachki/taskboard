import styles from "./TaskItem.module.scss";
import { Pencil, X } from "lucide-react";
import type { Task } from "../types/task";
import { memo } from "react";

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

const TaskItem = memo(function TaskItem({
   task,
   onEdit,
   onDelete,
 }: TaskItemProps) {
  const date =  new Date(task.createdAt);

  const formattedDate = `${date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  })}, ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;

  return (
    <div
      className={`${styles.taskItem} ${styles[task.status.toLowerCase()]}`}
    >
      <div className={styles.content}>
        <div className={styles.status}>{task.status}</div>
        <h3 className={styles.title}>{task.title}</h3>
        <div className={styles.createdAt}>{formattedDate}</div>
      </div>

      <div className={styles.actions}>
        <div
          className={`${styles.actionBtn} ${styles.edit}`}
          onClick={() => onEdit?.(task)}
          aria-label="Edit task"
        >
          <Pencil size={22} />
        </div>

        <div
          className={`${styles.actionBtn} ${styles.delete}`}
          onClick={() => onDelete?.(task.id)}
          aria-label="Delete task"
        >
          <X size={22} />
        </div>
      </div>
    </div>
  );
})

export default TaskItem