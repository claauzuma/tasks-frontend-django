import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const TaskFormPage = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        console.log("Tiene parametros ID")
        console.log(params.id)
        await updateTask(params.id, data);  // Llamada a la API para actualizar la tarea
        toast.success('Tarea modificada', {
          position: 'bottom-right',
          style: { background: "#101010", color: "#fff" }
        });
      } else {
        console.log("No tiene parametros id")
        await createTask(data);  // Llamada a la API para crear una nueva tarea
        toast.success('Tarea creada', {
          position: 'bottom-right',
          style: { background: "#101010", color: "#fff" }
        });
      }
      navigate('/tasks');
    } catch (error) {
      toast.error('Error al guardar la tarea');
    }
  });



  useEffect(() => {
    if (params.id) {
      async function loadTask() {
        console.log("El params id es:", params.id);
        try {
          const task = await getTask(params.id);  // Llamada a la API para obtener una tarea específica
          console.log("Respuesta de la API (task):", task);  // Verifica la respuesta de la API
          if (task) {
            setValue('title', task.title);  // Asignación de valores al formulario
            setValue('description', task.description);
          } else {
            toast.error('No se encontró la tarea');
          }
        } catch (error) {
          console.error("Error al obtener la tarea:", error);
          toast.error('Error al cargar la tarea');
        }
      }
  
      loadTask();
    }
  }, [params.id, setValue]);

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
              try {
                await deleteTask(params.id);  // Llamada a la API para eliminar la tarea
                toast.success('Tarea eliminada', {
                  position: 'bottom-right',
                  style: { background: "#101010", color: "#fff" }
                });
                navigate("/tasks");
              } catch (error) {
                toast.error('Error al eliminar la tarea');
              }
            }
          }}
            className='bg-red-500 p-3 rounded-lg w-48 mt-3'>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFormPage;
