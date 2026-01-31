import {useEffect, useState} from "react";
import TaskItem, {Status, type TaskItemProps} from "./TaskItem.tsx";
import styles from "./TasksList.module.scss"

export default function TasksList () {
  const [tasks, setTasks] = useState<TaskItemProps[]>([])
  const [editingTask, setEditingTask] = useState<boolean>(false)

  const [selectedStatus, setSelectedStatus] = useState<Status | "all">("all");
  const [filteredTasks, setFilteredTasks] = useState<TaskItemProps[]>([])

  // Getting all tasks
  useEffect(() => {
    fetch("api/tasks.json")
      .then(res => res.json())
      .then(setTasks)
      .catch(err => console.log(err))
  }, []);

  // Recalculate filteredTasks whenever tasks OR selectedStatus changes
  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredTasks(tasks);
    }
    else {
      setFilteredTasks(tasks.filter(task => task.status === selectedStatus));
    }
  }, [tasks, selectedStatus]);

  // Filter select
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as Status | "all");
  };

  // Edit Task
  const handleEdit = (title: string, status: Status) => {
    setEditingTask(true);
    console.log(editingTask);
    console.log(title, status);
  };

  // Delete Task — only update tasks
  const handleDelete = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Source of truth for tasks
  const availableTasks = filteredTasks;

  return (
    <div>
      <div className={styles.filter}>
        <div className="filterGroup">
          <label htmlFor="filter">Show Tasks:</label>
          <select name="filter" id="filter" onChange={handleFilter}>
            <option value="all" selected>All Tasks</option>

            {Object.values(Status).map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.count}>
          {availableTasks.length ?
            <> Showing {availableTasks.length} task{availableTasks.length !== 1 ? 's' : ''} </>
           : "No Tasks Available"
          }
        </div>
      </div>

      <div className={styles.tasks}>
        {availableTasks.length > 0 ? availableTasks.map( task =>
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            createdAt={task.createdAt}
            onEdit={() => handleEdit(task.title, task.status)}
            onDelete={() => handleDelete(task.id)}
          />
        ) : "No Tasks Created."}
      </div>
    </div>

  )
}