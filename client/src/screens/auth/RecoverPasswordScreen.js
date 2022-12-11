import React, { useState } from 'react'
import { recoverPassword } from '../../apis/userApis'
import { useNavigate } from 'react-router-dom'

const RecoverPasswordScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [displaySpinner, setDisplaySpinner] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('alert-danger')

    const navigate = useNavigate()

    const validatePassword = (password) => {
      const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
      return re.test(password);
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          if(password !== confirmPassword) {
            setMessage('Password do not match')
            setColor('alert-danger')
            setDisplaySpinner(true)

        } else if (!validatePassword(password)) {
            setMessage('length > 8 */+:! [A-Z] [a-z] [0-9]')
            setColor('alert-danger')
            setDisplaySpinner(false)
        } else {
          let cookie_email = document.cookie.split("=");
          if(cookie_email[1]!=="deleted") {
          cookie_email = decodeURIComponent(cookie_email).match(/\w+@\w+\.\w+/g)[0];
          setDisplaySpinner(true)
          const data = await recoverPassword(email, password, confirmPassword, cookie_email)
            if(data.data.success === true) {
              setDisplaySpinner(false)
              setMessage("Password Changed")
              setColor('alert-success')
            } else {
              setMessage("Problem")
              setColor('alert-danger')
            }
            document.cookie = "email" + "=" + "deleted"

            setTimeout(function(){ navigate('/login') }, 3000);
          
          } else {
              setMessage("You cant change password")
              setColor('alert-danger')
              document.cookie = "email" + "=" + "deleted"
              setDisplaySpinner(false)
              setTimeout(function(){ navigate('/recover-password-request') }, 2000);
          }
        }
        } catch (error) {
          setMessage("problem has occured")
          setDisplaySpinner(false)
          setColor('alert-danger')
          setTimeout(function(){ navigate('/recover-password-request') }, 2000);
        }
      
      
    }


  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h1 className="mt-4">Recover Password</h1>
        {message!=="" ? <div className={`alert mt-4 ${color}`}  role="alert">
          {message}
        </div>: null}
        <hr/>
        <form onSubmit={submitHandler}>
          <div className="form-group mt-4">
            <label className="form-label" htmlFor="exampleInputEmail1">Email</label>
            <input type="email" className="form-control-sm form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
            onChange={(e) => { 
            setMessage('') 
            setEmail(e.target.value)}}/>
          </div>
          <div className="form-group mt-3">
            <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control-sm form-control" id="exampleInputPassword1" placeholder="Password" 
            onChange={(e) => { 
            setMessage('') 
            setPassword(e.target.value)}}/>
          </div>
          <div className="form-group mt-3">
            <label className="form-label" htmlFor="exampleInputPassword">Confirm Password</label>
            <input type="password" className="form-control-sm form-control" id="exampleInputPassword" placeholder="Confirm Password" 
            onChange={(e) => { 
            setMessage('') 
            setConfirmPassword(e.target.value)}}/>
          </div>
         {displaySpinner ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
                <button className='btn btn-secondary btn-block' type='submit'>recover</button>
            </div>
          )}     
        </form>
      </div>
    </div>
  )
}

export default RecoverPasswordScreen
