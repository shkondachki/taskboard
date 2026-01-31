import styles from "./TaskForm.module.scss"
import {Status} from "./TaskItem";

export default function TaskForm () {
  return (
    <div className={styles.formWrapper}>
      <h2>Create/Update Task</h2>

      <form className="form">
        <div className="formGroup">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input type="text" name="title"/>
        </div>
        <div className="formGroup">
          <label htmlFor="status">
            Status <span className="required">*</span>
          </label>
          <select name="status" id="status">
            {Object.values(Status).map(status => (
              <option key={status} value={status}>
                {status}
              </option>
              ))}
          </select>
        </div>

        <div className="formGroup">
          <button type="button" className="btn-primary full-width">Update/Create</button>
        </div>
      </form>
    </div>
  )
}