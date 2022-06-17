import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Notes from './Notes';
import {useNavigate} from 'react-router-dom'
import AlertContext from '../context/alert/AlertContext';
import Alert from './Alert'

function Home() {
  const context = useContext(noteContext);
  const{ addNote} = context;

  const[note, setNote] = useState({title:'', description:'', tag:'default'})
  let navigate = useNavigate()

  const {alertState, showAlertState} =useContext(AlertContext);
  
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    // eslint-disable-next-line 
  },[])

  const inputEvent=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }

  const handleClick=(e)=>{
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({title:'', description:'', tag:'default'})
    showAlertState('Note added successfully.', 'success');
  }


  return (
    <div className="container mt-5  px-md-5 "> 
      <form className='border p-3 p-md-5 rounded'>
      {alertState.show && <Alert message={alertState.msg} type={alertState.type}/>}
        <h3 className='mt-5'>Add Notes</h3>
        <br/>
        <div className="mb-3">
          <label htmlFor="title" className="form-label"><strong>Title</strong></label>
          <input type="text" className="form-control" name='title' value={note.title} id="title" aria-describedby="emailHelp" onChange={inputEvent}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label"><strong>Description</strong></label>
          <input type="text" className="form-control" name='description' value={note.description} id="description" onChange={inputEvent}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"><strong>Tag</strong></label>
          <input type="text" className="form-control" name='tag' value={note.tag} id="tag" onChange={inputEvent}/>
        </div>

        <button type="submit" disabled={note.title.length>3 && note.description.length>5 ? false: true} className="btn btn-primary" onClick={handleClick}>Add</button>
      </form>

      <Notes/>
    </div>
  )
}

export default Home
