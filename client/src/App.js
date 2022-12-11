import React, {useEffect} from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import RecoverPasswordRequestScreen from './screens/auth/RecoverPasswordRequestScreen';
import RecoverPasswordScreen from './screens/auth/RecoverPasswordScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import ListTasksScreen from './screens/task/ListTasksScreen';
import TaskScreen from './screens/task/TaskScreen';
import GuardedRoute from './GuardedRoute';
import { getInfoFromToken, logout } from './actions/userActions'
import { listTasks } from './actions/taskActions'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    
    if(localStorage.getItem('access_token')) {
      dispatch(getInfoFromToken()).then((data) => {
        if(!data) {
          dispatch(logout()).then(() => {
            window.open("localhost:3000")
          })
        }
        else {
          dispatch(listTasks());
        }
      })
    }
  }, [])
  return (
    <BrowserRouter>
    <ReactNotifications />
    <Header />
    <div className="app container">
     <Routes>
       <Route path="/" exact element={<LoginScreen />} />
       <Route path="/login" element={<LoginScreen />} />
       <Route element={<RegisterScreen/>} path="/register"/>
       <Route path="/recover-password-request" element={<RecoverPasswordRequestScreen />} />
        <Route path="/recover-password" element={<RecoverPasswordScreen />} />
       <Route element={<GuardedRoute />}>
                <Route path="/tasks" exact element={<ListTasksScreen />} />
                <Route path="/tasks/:id" element={<TaskScreen />} />
        </Route>
     </Routes>
     </div>
   </BrowserRouter>
  );
}

export default App;
