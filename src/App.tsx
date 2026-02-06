import styles from './App.module.scss'
import TasksList from "./components/TasksList.tsx";
import {ErrorBoundary} from "./components/ErrorBoundary";

function App() {

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <h1>Tasks</h1>

        <ErrorBoundary fallback={
          <div style={{ padding: "1rem" }}>
            <h2>Taskboard crashed</h2>
            <p>Try refreshing the page. If it keeps happening, check the console.</p>
          </div>
        }>
          <TasksList />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
