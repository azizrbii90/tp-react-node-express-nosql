import API from './axiosConfig'

export const registerApi = (newUser) => API.post('/users/register/', newUser)
export const loginApi = (user) => API.post('/users/login/', user)
export const getInfoFromTokenApi = () => API.get('/users/get-info-from-token/')
export const userUpdateApi = (user) => API.put('/users/update-user/', user)
export const recoverPasswordRequest = (email) => API.get(`/users/recover-password-request/${email}`);
export const recoverPassword = (email, password, confirmPassword, cookie_email) => API.put(`/users/recover-password/`, {email, password, confirmPassword, cookie_email});