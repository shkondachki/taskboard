import {useCallback, useEffect, useState} from "react";
import type { Task } from "../types/task";

const STORAGE_KEY = "tasks";
const FALLBACK_URL = "/api/tasks.json";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load: localStorage -> fallback JSON
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
          setTasks(JSON.parse(stored));
        }
        else {
          const res = await fetch(FALLBACK_URL);
          if (!res.ok) throw new Error("Failed to fetch fallback data");

          const data: Task[] = await res.json();

          setTasks(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      }
      catch (err) {
        setError("Failed to load tasks");
      }
      finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Persist on every tasks change (after initial load)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  // Create Task
  const createTask = useCallback( (task: Task) => {
    setTasks(prev => [task, ...prev]);
  }, []);

  // Update Task
  const updateTask = useCallback( (updated: Task) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updated.id ? updated : task
      )
    );
  }, []);

  // Delete Task
  const deleteTask = useCallback( (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
  };
}
