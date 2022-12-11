import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { login } from '../../actions/userActions'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayPassword, setDisplayPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [displaySpinner, setDisplaySpinner] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { user, error, loading } = userLogin

    const loginHandler = (e) => {
        e.preventDefault()
        setDisplaySpinner(true)
        if (email == '') {
            setMessage('Enter your email address')
        } else if (password == '') {
            setMessage('Enter your password')
        } else {
            dispatch(login(email, password)).then((data) => {
                if (!data) {
                    setMessage("wrong data")
                    setDisplaySpinner(false)
                } else {
                    setMessage('')
                    setEmail('')
                    setPassword('')
                    setDisplaySpinner(false)
                    navigate("/tasks")
                }
            })
        }
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {message !== '' && (
                <div className='alert alert-danger'>
                    {message}
                </div>
            )}
            <form onSubmit={loginHandler} className="w-50">
                <div className='form-group'>
                    <label className='label'>Email</label>
                    <input className='form-control' type='text' placeholder='Email' value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setMessage('')
                        }} />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Password</label>
                    <div className='input-group'>
                        <input className='form-control form-control' type={displayPassword ? 'text' : 'password'} value={password} placeholder='Enter password'
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setMessage('')
                            }} />
                        <div className="input-group-append">
                            <span className="input-group-text cursor-pointer"
                                onClick={() => { setDisplayPassword(!displayPassword) }}>
                                <i className="fa fa-eye"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <br />
                {displaySpinner ? (
                    <div className='spinner-border text-secondary'>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <button className="btn btn-secondary btn-block mt-3" type='submit'>Login</button>
                )}
                <div className="row mt-3">
                    <div className="col-8">
                        <Link to="/register">
                            you dont have an account ? sign up
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/recover-password-request">
                            forgot password ?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen;
