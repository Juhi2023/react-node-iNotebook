import React, { useContext, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';
import Alert from './Alert';


function Login() {

    const [details, setDetails] = useState({email:'', password:''})
    let navigate  = useNavigate();

    const {alertState, showAlertState} =useContext(AlertContext);


    const inputEvent=(e)=>{
        setDetails({...details, [e.target.name]:e.target.value})
      }

    const handleClick= async(e)=>{
        e.preventDefault();
        const response = await fetch(`/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body:  JSON.stringify({email: details.email, password: details.password})
          });
          const json = await response.json()
          if(json.status ==='success'){
            localStorage.setItem('token', json.authToken);
            navigate('/')
          }else{
            showAlertState('Inavalid Credentials.', 'danger');
          }
    }

  return (
    
    <div className='container px-md-5'>
      
      <form className='px-md-5 mt-5'>
        <h2> Login to continue</h2>
        <br />
        {alertState.show && <Alert message={alertState.msg} type={alertState.type}/>}
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={details.email} id="email" aria-describedby="emailHelp" placeholder='email' onChange={inputEvent}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={details.password} id="password" placeholder='password' onChange={inputEvent}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Login</button>
        </form>
    </div>
  )
}

export default Login
