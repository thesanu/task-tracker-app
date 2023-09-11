import React, { useState } from 'react';
import './TaskForm.css'

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '' || dueTime.trim()=== '') {
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      dueTime,
      completed: false,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
  };

  return (
    <div className='task-form'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Task Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Task Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='date'
          className='Date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
        type='time'
        className='Time'
        value={dueTime}
        onChange={(e)=> setDueTime(e.target.value)}
        ></input>
        <button type='submit' className='add-task-button'>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;