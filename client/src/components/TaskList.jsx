import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api';
import TaskCard from './TaskCard';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await getAllTasks();
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    loadTasks();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-3'>

      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))
      ) : (
        <p>No tasks available</p> // Puedes mostrar un mensaje si no hay tareas
      )}
    </div>
  );
}

export default TaskList;
