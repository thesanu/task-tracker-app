import React, { useState } from 'react';
  import './Modal.css'; // Import the Modal.css file
  import './TaskList.css'; // Import the TaskList.css file
  
  function TaskList({ tasks, editTask, deleteTask, toggleCompletion }) {
    // State variables to manage the editing modal
    const [editingTask, setEditingTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [editedTime, setEditedTime] = useState('');
  
    // Function to open the edit modal with task details
    const openEditModel = (task) => {
      setEditingTask(task);
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setEditedDate(task.dueDate);
      setEditedTime(task.dueTime);
    };
  
    // Function to close the edit modal and reset state variables
    const closeEditModal = () => {
      setEditingTask(null);
      setEditedTitle('');
      setEditedDescription('');
      setEditedDate('');
      setEditedTime('');
    };
  
    // Function to handle the task edit
    const handleEdit = () => {
      if (editedTitle.trim() === '' || editedDescription.trim() === '' || editedDate.trim() === '' || editedTime.trim() === '') {
        return;
      }
  
      // Update the task with edited values
      editTask({
        ...editingTask,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDate,
        dueTime: editedTime,
      });
  
      // Close the edit modal
      closeEditModal();
    };
  
    return (
      <div className='task-list'>
        {/* Map through tasks and display each task */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Due Time: {task.dueTime}</p>
            {/* Button to open the edit modal */}
            <button onClick={() => openEditModel(task)} className='edit-button'>
              Edit
            </button>
            {/* Button to delete the task */}
            <button onClick={() => deleteTask(task.id)} className='delete-button'>
              Delete
            </button>
            {/* Button to toggle task completion */}
            <button
              onClick={() => toggleCompletion(task.id)}
              className='toggle-button'
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        ))}
        {/* Edit modal */}
        {editingTask && (
          <div className='modal'>
            <div className='modal-content'>
              <h3>Edit Task</h3>
              <input
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <input
                className='m-date'
                type='date'
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
              />
              <input
                className='m-time'
                type='time'
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
              />
              {/* Button to save the edited task */}
              <button onClick={handleEdit} className='save-button'>
                Save
              </button>
              {/* Button to cancel editing */}
              <button onClick={closeEditModal} className='cancel-button'>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

export default TaskList;
