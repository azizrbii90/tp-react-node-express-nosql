import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { recoverPasswordRequest } from '../../apis/userApis'

const RecoverPasswordRequestScreen = () => {
    const [email, setEmail] = useState('')

    const [message, setMessage] = useState('')
    const [color, setColor] = useState('alert-danger')
    const [displaySpinner, setDisplaySpinner] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setDisplaySpinner(true)
            recoverPasswordRequest(email).then((data) =>  {
            setDisplaySpinner(false)
            setMessage(data.data.message)
            if(data.data.message==="Check your email to recover your password!")  {
              setEmail('')
              setColor("alert-success") 
            }
          }).catch((error) => { 
            setDisplaySpinner(false)
            setMessage(error.response.data.message)
          })
      
    }

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h1 className="mt-4">Forgot Password</h1>
        {message && <div className={`alert mt-4 ${color}`} role="alert">
          {message}
        </div>}
        <hr/>
        <form onSubmit={submitHandler}>
           <div className="form-group mt-4">
             <label className="form-label" htmlFor="exampleInputEmail1">Email</label>
             <input type="email" className="form-control-sm form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {
             setEmail(e.target.value)
             setMessage('')}}/>
           </div>
           {displaySpinner ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
                <button className='btn btn-secondary btn-block' type='submit'>Send</button>
            </div>
          )}             
           <div className="row mt-3">
              <div className="col-8 align-self-start">
                <Link to="/login">
                   you have an account ? sign in
                </Link>
              </div>
            </div>           
          </form>
        </div>
      </div>
   )
}

export default RecoverPasswordRequestScreen
