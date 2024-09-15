import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api';
import TaskCard from './TaskCard';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await getAllTasks(); 
        console.log("Traimos la data ")
        console.log(res) 
        setTasks(res); 
        console.log(tasks)
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
        <p>No tasks available</p> 
      )}
    </div>
  );
}

export default TaskList;
