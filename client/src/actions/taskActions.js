import { TASK_REQUEST, 
         TASK_CREATE_FAIL, TASK_CREATE_SUCCESS,
         TASK_LIST_FAIL, TASK_LIST_SUCCESS,
         TASK_UPDATE_SUCCESS, TASK_UPDATE_FAIL,
         TASK_DELETE_SUCCESS, TASK_DELETE_FAIL } 
from "../constants/taskConstants";   

import * as taskApis from "../apis/taskApis"

export const listTasks = () => async (dispatch) => {

    try {
        
        dispatch({ type: TASK_REQUEST})
        const { data } = await taskApis.taskListApi()
        dispatch({ type: TASK_LIST_SUCCESS, payload: data.tasks })
        console.log("list tasks successfully ", data)

    } catch (err) {
        console.log("error list tasks ",err.response.data.message)
        dispatch({ type: TASK_LIST_FAIL, payload: err.response.data.message })
    }
}

export const createTask = (newtask) => async (dispatch) => {

    try {
       
        dispatch({ type: TASK_REQUEST })
        const { data } = await taskApis.taskCreateApi(newtask)
        dispatch({ type: TASK_CREATE_SUCCESS, payload: data.task })
        console.log("create task successfully ", data.task)
        return true
    
    } catch (err) {
        console.log("error create task ",err.response.data.message)
        dispatch({ type: TASK_CREATE_FAIL, payload: err.response.data.message })
        return false
    }
}

export const updateTask = (task) => async(dispatch) => {
    try {
       
        dispatch({ type: TASK_REQUEST })
        const { data } = await taskApis.taskUpdateApi(task)
        dispatch({ type: TASK_UPDATE_SUCCESS, payload: data.task })
        console.log("update task successfully ", data.task)
        return true

    } catch (err) {
        console.log("error update task ",err.response.data.message)
        dispatch({ type: TASK_UPDATE_FAIL, payload: err.response.data.message })
    }

}

export const deleteTask = (id) => async(dispatch) => {
    
    try {
       
        dispatch({ type: TASK_REQUEST })
        const { data } = await taskApis.taskDeleteApi(id)
        dispatch({ type: TASK_DELETE_SUCCESS, payload: data.task })
        console.log("delete task successfully ", data.task)
        return true

        } catch (err) {
            console.log("error delete task ",err.response.data.message)
            dispatch({ type: TASK_DELETE_FAIL, payload: err.response.data.message })
            return false
        }
}