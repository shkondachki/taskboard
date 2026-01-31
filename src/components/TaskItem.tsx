import styles from './TaskItem.module.scss'
import {Pencil, X} from "lucide-react";

export enum Status {
  todo = 'Todo',
  inProgress = 'In-Progress',
  done = 'Done'
}

export interface TaskItemProps  {
  id: number;
  title: string;
  status: Status
  createdAt: string;

  onEdit?: (title: string, status: Status) => void
  onDelete?: (id: number) => void
}

export default function TaskItem ({
  id,
  title,
  status = Status.todo,
  createdAt,
  onEdit,
  onDelete
}: TaskItemProps) {

  const date = new Date(createdAt)

  const formattedDate = `${date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short"
  })}, 
  ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })}`;

  return (
    <div key={id} className={ `${styles.taskItem} ${styles[ status.toLowerCase() ]} `}>
      <div className={styles.content}>
        <div className={styles.status}>{status}</div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.createdAt}>{formattedDate}</div>
      </div>

      <div className={styles.actions}>
        <div
          onClick={() => onEdit ? onEdit(title, status) : ""}
          className={ `${styles.actionBtn} ${styles.edit}` }
        >
          <Pencil size={23}/>
        </div>

        <div
          onClick={() => onDelete ? onDelete(id) : ""}
          className={ `${styles.actionBtn} ${styles.delete}` }
        >
          <X size={23} />
        </div>
      </div>
    </div>
  )
}