import axios from 'axios';

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/' // Cambié `baseUrl` por `baseURL`
});

export const getAllTasks = () => {
    return tasksApi.get('/');
}

export const getTask = (id) =>  tasksApi.get('/'+id+'/');


export const createTask = (task) => {
    return tasksApi.post('/', task);
}

export const deleteTask = (id) => {
    return tasksApi.delete('/'+ id +'/');
}

export const updateTask = (id, task) => {
    console.log("Task Data:", task);  // Verifica los datos
    return tasksApi.put(`/${id}/`,task);  
}


