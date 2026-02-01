import styles from './App.module.scss'
import TasksList from "./components/TasksList.tsx";

function App() {

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <h1>Tasks</h1>

        <TasksList />
      </div>
    </div>
  )
}

export default App
