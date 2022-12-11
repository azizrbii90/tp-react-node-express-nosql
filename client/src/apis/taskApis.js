import API from './axiosConfig'

export const taskListApi = () => API.get('/tasks/')
export const taskCreateApi = (newTask) => API.post('/tasks/', newTask)
export const taskUpdateApi = (task) => API.put('/tasks/', task)
export const taskDeleteApi = (id) => API.delete(`/tasks/${id}`)