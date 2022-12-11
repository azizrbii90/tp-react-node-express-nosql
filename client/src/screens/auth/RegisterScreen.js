import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';

import { registerApi } from '../../apis/userApis'

const RegisterScreen = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [displaySpinner, setDisplaySpinner] = useState(false)
  const [displayPassword, setDisplayPassword] = useState(false)
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [clicked, setClicked] = useState(false)

  const registerHandler = (e) => {
    setClicked(true)
    e.preventDefault()

    if(email !='' && password !='' && confirmPassword !='') {
      setDisplaySpinner(true)
    registerApi({ email: email, password: password, confirmPassword: confirmPassword, 
                  first_name: first_name, last_name: last_name, phoneNumber: phoneNumber })
    .then(() => {
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setFirst_name('')
          setLast_name('')
          setPhoneNumber('')
          setDisplaySpinner(false)
          setMessage('Verify your email please')
          Store.addNotification({
            title: "Verify you email please",
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
          setTimeout(function() {
            navigate('/');
          }, 2000)  
    })
    .catch((err) => {
      setDisplaySpinner(false)
      setMessage(err.response.data.error)
      Store.addNotification({
        title: err.response.data.error,
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 2000,
        }
      })
    })
    }
    
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        {message!=='' && (
          <div className={message=='Verify your email please' ? "w-90 alert alert-success" : "w-90 alert alert-danger"} role="alert">
            {message}
          </div>
        ) }
        <form onSubmit={registerHandler} className="w-50">
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input className='form-control form-control' type='email' value={email} placeholder='Enter email'
              onChange={(e) => { setEmail(e.target.value) 
                                 setMessage('')}} />
            <small className="text-danger">
              {email=='' && clicked? ('Please Provide a email') : (<span>&nbsp;</span>) } 
            </small>  
          </div>
          <div className='form-group'>
            <label className='form-label'>First Name</label>
            <input className='form-control form-control' type='text' value={first_name} placeholder='Enter first name'
              onChange={(e) => { setFirst_name(e.target.value)
                                 setMessage('') }} />
          </div>
          <div className='form-group'>
            <label className='form-label'>Last Name</label>
            <input className='form-control form-control' type='text' value={last_name} placeholder='Enter last name'
              onChange={(e) => { setLast_name(e.target.value)
                                 setMessage('') }} />
          </div>
          <div className='form-group'>
            <label className='form-label'>Phone Number</label>
            <input className='form-control form-control' type='text' value={phoneNumber} placeholder='Enter phoneNumber'
              onChange={(e) => { setPhoneNumber(e.target.value)
                                 setMessage('') }} />
            <small className="text-danger">
              {phoneNumber=='' && clicked? ('Please Provide a last name') : (<span>&nbsp;</span>) } 
            </small>  
          </div>
          <div className='form-group'>
            <label className='form-label'>Password</label>
            <div className='input-group'>
              <input className='form-control form-control' type={ displayPassword ? 'text' : 'password'} value={password} placeholder='Enter password'
              onChange={(e) => { setPassword(e.target.value)
                                 setMessage('') }} />
              <div className="input-group-append">
                <span className="input-group-text cursor-pointer" 
                  onClick={() => { setDisplayPassword(!displayPassword) }}>
                  <i className="fa fa-eye"></i>
                </span>
              </div>
            </div>  
          </div>
          <div className='form-group'>
            <label className='form-label'>Confirm password</label>
            <div className='input-group'>
              <input className='form-control form-control' type={ displayConfirmPassword ? 'text' : 'password'} value={confirmPassword} placeholder='Enter Confirm password'
              onChange={(e) => { setConfirmPassword(e.target.value)
                                 setMessage('') }} />
              <div className="input-group-append">
                <span className="input-group-text cursor-pointer"
                  onClick={() => { setDisplayConfirmPassword(!displayConfirmPassword) }}>
                    <i className="fa fa-eye"></i>
                </span>
              </div>
            </div>
          </div>
          <br/>
          {displaySpinner ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
                <button className='btn btn-secondary btn-block' type='submit'>Register</button>
            </div>
          )}          
        </form>
    </div>
  )
}

export default RegisterScreen