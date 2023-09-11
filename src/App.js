import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const editTask = (editedTask) => {
    const updatedTask = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTask);
  };

  const deleteTask = (taskId) => {
    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
  };

  const toggleCompletion = (taskId) => {
    const updatedTask = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTask);
  };

  const calculateDueDateNotifications = () => {
    const now = new Date();
    const notifiedTasks = new Set();
    tasks.forEach((task) => {
      const dueDateTime = new Date(task.dueDate + 'T' + task.dueTime);
      const timeDiff = dueDateTime - now;
      const minutesDiff = timeDiff / (1000 * 60);

      if (minutesDiff <= 0 && !task.completed && !notifiedTasks.has(task.id)) {
        toast.warning(`Task "${task.title}" is overdue!`);
        notifiedTasks.add(task.id);
      } else if (
        minutesDiff > 0 &&
        minutesDiff <= 30 &&
        !task.completed &&
        !notifiedTasks.has(task.id)
      ) {
        toast.info(`Task "${task.title}" is expiring soon.`);
        notifiedTasks.add(task.id);
      }
    });
  };

  useEffect(() => {
    calculateDueDateNotifications();
    // Check for overdue tasks every minute
    const intervalId = setInterval(() => {
      calculateDueDateNotifications();
    }, 60000); // Check every minute

    return () => {
      clearInterval(intervalId);
    };
  }, [tasks]);

  return (
    <div className='App'>
      <h1>Task Tracker App</h1>
      <TaskForm addTask={addTask} />
      <ToastContainer
        className='custom-toast-container'
        position='top-right'
        autoClose={45000}
      />
      <TaskList
        tasks={tasks}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
}

export default App;
