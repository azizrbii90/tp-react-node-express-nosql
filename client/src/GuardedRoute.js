import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GuardedRoute = () => {

    const access_token = localStorage.getItem('access_token')

    return(
        access_token  ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default GuardedRoute;