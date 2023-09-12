// Import necessary components and styles
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  // Initialize state to hold the list of tasks
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task to the list
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to edit an existing task in the list
  const editTask = (editedTask) => {
    const updatedTask = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTask);
  };

  // Function to delete a task from the list
  const deleteTask = (taskId) => {
    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
  };

  // Function to toggle the completion status of a task
  const toggleCompletion = (taskId) => {
    const updatedTask = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTask);
  };

  // Function to calculate and display due date notifications
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

  // Use an effect to trigger the due date notifications and check for overdue tasks every minute
  useEffect(() => {
    calculateDueDateNotifications();
    // Check for overdue tasks every minute
    const intervalId = setInterval(() => {
      calculateDueDateNotifications();
    }, 60000); // Check every minute

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [tasks]);

  // Render the main application
  return (
    <div className='App'>
      <h1>Task Tracker App</h1>
      {/* TaskForm component for adding new tasks */}
      <TaskForm addTask={addTask} />
      {/* ToastContainer for displaying notifications */}
      <ToastContainer
        className='custom-toast-container'
        position='top-right'
        autoClose={45000} // Notifications automatically close after 45 seconds
      />
      {/* TaskList component to display the list of tasks */}
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
