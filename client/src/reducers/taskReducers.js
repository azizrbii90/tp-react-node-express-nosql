import { TASK_REQUEST,
         TASK_CREATE_FAIL, TASK_CREATE_SUCCESS,
         TASK_LIST_FAIL, TASK_LIST_SUCCESS,
         TASK_UPDATE_SUCCESS, TASK_UPDATE_FAIL,
         TASK_DELETE_SUCCESS, TASK_DELETE_FAIL  }    
from "../constants/taskConstants";   

export const taskReducer = (state = { tasks: [], error: null, loading: false }, action) => {

    switch (action.type) {
        
        case TASK_REQUEST:
            return { ...state, error: null, loading: true }

        case TASK_LIST_SUCCESS: 
            return { tasks: action.payload, error: null, loading: false }

        case TASK_LIST_FAIL: 
            return { tasks: [], error: action.payload, loading: false }

        case TASK_CREATE_SUCCESS:
            return { tasks: [...state.tasks, action.payload], error: null, loading: false }

        case TASK_CREATE_FAIL:
            return { ...state, error: action.payload, loading: false }

        case TASK_UPDATE_SUCCESS: 
            return { tasks: state.tasks.map((c) => (c._id == action.payload._id ? action.payload : c)), error: null, loading: false }
        
        case TASK_UPDATE_FAIL:
            return { ...state, error: action.payload, loading: false} 

        case TASK_DELETE_SUCCESS:
            return { tasks: state.tasks.filter((c) => (c._id != action.payload._id)), error: null, loading: false }   
        
        case TASK_DELETE_FAIL:
            return { ...state, error: action.payload, loading: false }  

        default: 
            return state;
    }
}