import styles from "./TaskForm.module.scss";
import { useEffect, useState } from "react";
import { type Task, Status } from "../types/task";

export interface TaskFormData {
  title: string;
  status: Status;
}

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
}

const emptyForm: TaskFormData = {
  title: "",
  status: Status.todo,
};

export default function TaskForm({
   initialData,
   onSubmit,
   onCancel,
 }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});

  // Populate form on edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        status: initialData.status,
      });
    }
    else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [initialData]);

  // Handle ESC
  useEffect(() => {
    if (!initialData || !onCancel) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeydown)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }

  }, [initialData, onCancel]);

  const validate = () => {
    const newErrors: { title?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      onSubmit(formData);

      if (!initialData) {
        setFormData(emptyForm);
      }
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    onCancel?.();
  };

  return (
    <div className={styles.formWrapper}>
      <h2>{initialData ? "Edit Task" : "Create Task"}</h2>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="formGroup">
          <label htmlFor="title">Title <span className="required">*</span></label>
          <input
            id="title"
            type="text"
            value={formData.title}
            className={errors.title ? "error" : ""}
            onChange={e =>
              setFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />
          {errors.title && (
            <p className="errorMessage">{errors.title}</p>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                status: e.target.value as Status,
              }))
            }
          >
            {Object.values(Status).map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className={`formData ${styles.buttonActions}`}>
          {initialData && onCancel && (
            <button
              type="button"
              className="btn-secondary full-width"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn-primary full-width"
            disabled={isSubmitting}
          >
            {initialData ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
