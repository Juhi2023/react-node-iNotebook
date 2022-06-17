import React from "react";
import '../index.css'
import { Link , useNavigate} from "react-router-dom";


function Navbar(props){
    let navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/#"><strong>iNoteBook</strong></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse float-end" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link  className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link  className="nav-link" to="/about">About</Link>
                        </li>
                        
                    </ul>
                    {!localStorage.getItem('token') ? <div className="float-end">
                        <Link  className="nav-link d-inline-block mx-1" to="/login"><button type="button" className="btn-sm btn-primary border-none" role="button">Login</button></Link>
                        <Link  className="nav-link d-inline-block  mx-1" to="/signup"><button type="button" className="btn-sm btn-primary border-none" role="button">Signup</button></Link>
                    </div> : <button type="button" className="btn-sm btn-primary border-none" role="button" onClick={handleLogout}>LogOut</button>
                    
}
                </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;