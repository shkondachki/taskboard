import styles from './App.module.scss'
import TasksList from "./components/TasksList.tsx";
import TaskForm from "./components/TaskForm";

function App() {

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <h1>Tasks</h1>

        <div className={styles.content}>
          <TasksList />
          <TaskForm />
        </div>

      </div>

    </div>
  )
}

export default App
