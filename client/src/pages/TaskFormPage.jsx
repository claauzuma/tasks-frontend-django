import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask, getAllTasks } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast'


const TaskFormPage = () => {

  const { register, handleSubmit, formState: { errors },setValue } = useForm();
  const [guardado, setGuardado] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if(params.id) {
     await updateTask(params.id, data)
     toast.success('Tarea modificada', {
      position: 'bottom-right', style: {
        background: "#101010",
        color: "#fff"
      }
    })
    } else {

    await createTask(data);
    toast.success('Tarea creada', {
      position: 'bottom-right', style: {
        background: "#101010",
        color: "#fff"
      }
    })

    }


    navigate('/tasks');
  });


  useEffect( ()=> {

      
    async function loadTask() {
      if(params.id) {
       const res =  await getTask(params.id);
       console.log(res)
       setValue('title', res.data.title)
       setValue('description', res.data.description)
      }
    
    }

    loadTask();


},[])


  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='title'
          {...register("title", { required: true })}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        />
        {errors.title && <span>This field is required</span>}

        <textarea rows='3' placeholder='description'
          {...register("description", { required: true })}
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
        </textarea>
        {errors.description && <span>This field is required</span>}

        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
      </form>

      {params.id && (
      <div className='flex justify-end'> 
                    <button onClick={async () => {
                  const accepted = window.confirm('Are you sure?');
                  if (accepted) {
                    await deleteTask(params.id);
                    toast.success('Tarea elimnada', {
                      position: 'bottom-right', style: {
                        background: "#101010",
                        color: "#fff"
                      }
                    })
                    navigate("/tasks");
                  }
                 
        
                }}
                
                className='bg-red-500 p-3 rounded-lg w48 mt-3'>
                  Delete
                </button>


      </div>


      )}
    </div>
  );
};

export default TaskFormPage;
