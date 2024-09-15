import axios from 'axios';

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/api/tasks',
    timeout: 5000 
});


export const getAllTasks = async () => {
    try {
        console.log("Obteniendo todas las tareas...");
        const { data } = await tasksApi.get('/');
        return data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error.response ? error.response.data : error.message);
        throw error; 
    }
};


export const getTask = async (id) => {
    try {
        console.log("Intentamos traer la tareaaaa")
        const { data } = await tasksApi.get(`/${id}`);
        console.log("Traemos la tarea " + data)
        return data;
    } catch (error) {
        console.error(`Error al obtener la tarea con ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};


export const createTask = async (task) => {
    try {
        const { data } = await tasksApi.post('/', task);
        return data;
    } catch (error) {
        console.error('Error al crear la tarea:', error.response ? error.response.data : error.message);
        throw error;
    }
};
 

export const deleteTask = async (id) => {
    try {
        console.log("Vamos a intentar a borrar la tarea con el id " + id)
        await tasksApi.delete(`/${id}`);
        console.log(`Tarea con ID ${id} eliminada correctamente.`);
    } catch (error) {
        console.error(`Error al eliminar la tarea con ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateTask = async (id, task) => {
    try {
        const { data } = await tasksApi.put(`/${id}/`, task);
        console.log(`Tarea con ID ${id} actualizada correctamente.`);
        return data;
    } catch (error) {
        console.error(`Error al actualizar la tarea con ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};


