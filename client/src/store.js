import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; 

import { userLoginReducer } from "./reducers/userReducers"
import { taskReducer } from "./reducers/taskReducers"


const reducer = combineReducers({
    
    userLogin : userLoginReducer,
    taskReducer : taskReducer
})

const middleware = [thunk]; 

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;