import React, { useContext, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';
import Alert from './Alert'


function Signup() {

    const [details, setDetails] = useState({name:'', email:'', password:''})
    let navigate= useNavigate();
    const {alertState, showAlertState} =useContext(AlertContext);

    const inputEvent=(e)=>{
        setDetails({...details, [e.target.name]:e.target.value})
      }

    const handleClick= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body:  JSON.stringify({name:details.name, email: details.email, password: details.password})
          });
          const json = await response.json()
          console.log(json);
          if(json.status!=='success'){
            showAlertState('Inavalid Credentials.', 'danger');
          }else{
            localStorage.setItem('token', json.authToken);
            navigate('/');
          }
    }

  return (
    <div>
      <div className='container px-md-5'>
    
    <br />
    <form className='px-md-5'>
    <h2> Sign Up to continue</h2>
        <br />
        {alertState.show && <Alert message={alertState.msg} type={alertState.type}/>}
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={details.name} id="name" aria-describedby="emailHelp" placeholder='name' onChange={inputEvent}/>
        </div>

        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={details.email} id="email" aria-describedby="emailHelp" placeholder='email' onChange={inputEvent}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={details.password} id="password" placeholder='password' onChange={inputEvent}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>SignUp</button>
        </form>
    </div>
    </div>
  )
}

export default Signup
