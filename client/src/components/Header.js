import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {

    const userLogin = useSelector((state) => state.userLogin)
    const { user } = userLogin
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">TP</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                        <Link to="/" style={{ textDecoration:"none" }}>
                            <span className="nav-item nav-link cursor-pointer">Login</span>
                        </Link>
                        <Link to ="/register" style={{ textDecoration:"none" }}>
                            <span className="nav-item nav-link cursor-pointer">Register</span>
                        </Link>
                        
                        {user && (
                            <Link to ="/tasks/" style={{ textDecoration:"none" }}>
                                <span className="nav-item nav-link cursor-pointer">Tasks</span>
                            </Link>
                        )}
                </div>
            </div>
        </nav>
    )
}

export default Header