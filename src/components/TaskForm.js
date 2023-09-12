import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ addTask }) {
  // Define state variables for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the required fields are empty
    if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '' || dueTime.trim() === '') {
      return;
    }
    // Create a new task object with the provided data
    const newTask = {
      id: Date.now(), // Generate a unique ID (timestamp)
      title,
      description,
      dueDate,
      dueTime,
      completed: false, // Initially, the task is not completed
    };
    // Call the addTask function passed from the parent component to add the new task
    addTask(newTask);
    // Clear the form inputs after adding the task
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
  };

  return (
    <div className='task-form'>
      <form onSubmit={handleSubmit}>
        {/* Input field for task title */}
        <input
          type='text'
          placeholder='Task Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Textarea for task description */}
        <textarea
          placeholder='Task Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Input field for due date */}
        <input
          type='date'
          className='Date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {/* Input field for due time */}
        <input
          type='time'
          className='Time'
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        {/* Submit button to add the task */}
        <button type='submit' className='add-task-button'>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
