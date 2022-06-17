import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Card from './Card';
import AlertContext from '../context/alert/AlertContext';


function Notes() {
    
  const context = useContext(noteContext);
  const{notes, getNotes, editNote} = context;
  const {showAlertState} =useContext(AlertContext);

  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
    }
    // eslint-disable-next-line 
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);
  const[note, setNote] = useState({id: '', etitle:'', edescription:'', etag:'default'})


  const updateNote=(currNote)=>{
    setNote({id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag})
    ref.current.click()
  }
  
  const inputEvent=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }

  const handleClick=(e)=>{
    editNote(note.id, note.etitle, note.edescription, note.tag)
    refClose.current.click()
    showAlertState('Note updated successfully.', 'warning');
  }

  return (
    
    <>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="container mt-1  px-md-5 "> 
                <form>
                    <div className="mb-3">
                    <label htmlFor="etitle" className="form-label"><strong>Title</strong></label>
                    <input type="text" className="form-control" name='etitle' value={note.etitle} id="etitle" aria-describedby="emailHelp" onChange={inputEvent}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="edescription" className="form-label"><strong>Description</strong></label>
                    <input type="text" className="form-control" name='edescription' value={note.edescription} id="edescription" onChange={inputEvent}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="etag" className="form-label"><strong>Tag</strong></label>
                    <input type="text" className="form-control" name='etag' value={note.etag} id="etag" onChange={inputEvent}/>
                    </div>
                </form>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
              <button type="button" className="btn btn-primary" disabled={note.etitle.length>3 && note.edescription.length>5 ? false: true} onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div> 
      <div className="my-5 border p-3 p-md-5 rounded">
        <h3>Your Notes</h3>
        <div className='d-flex flex-row flex-wrap mx-auto'>
          {notes.length===0 && <div><br/>Empty </div> }
          {notes.map((elem, index)=>{
            return <Card note={elem} key={index} updateNote={updateNote}/>
          })}
        </div>
    </div>
    </>
  )
}

export default Notes
