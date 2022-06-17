import React, { useContext } from 'react'
import '../App.css'
import noteContext from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';



function Card(props) {
  const context = useContext(noteContext);
  const{ deleteNote} = context;
  const {showAlertState} =useContext(AlertContext);

  const onDelete=(id)=>{
    deleteNote(id);
    showAlertState('Note deleted Successfully.', 'danger');
  }

  const{note, updateNote}= props;

  return (
    <div className='m-3'>
      <div className="card text-dark bg-light mb-3" style={{width: '21rem'}}>
        <div className="card-header">
        <strong>{note.title}</strong>
        <div className='float-end'>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
          <i className="fa-solid fa-trash-can" onClick={()=>{onDelete(note._id)}}></i></div>
        </div>
        <div className="card-body">
            <p className="card-text">{note.description}</p>
            <span className="badge bg-dark">{note.tag}</span>

        </div>
        </div>
    </div>
  )
}

export default Card
