import React, { useState } from 'react'
import NoteContext from './NoteContext';


function NoteState(props) {
  const [notes, setNotes] = useState([]);

  const getNotes = async ()=>{
    const response = await fetch(`/allnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json);
  }

   const addNote= async (title, description, tag)=>{
    const response = await fetch(`/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

      const note = await response.json()
      console.log(notes)
      setNotes(notes.concat(note))
    }

    const deleteNote= async (id)=>{
      // eslint-disable-next-line
      const response = await fetch(`/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const newNotes= notes.filter((elem)=>{
        return elem._id !== id;
      })
      setNotes(newNotes)
    }

    const editNote= async (id, title, description, tag)=>{
      // eslint-disable-next-line
      const response = await fetch(`/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      

      const newNotes=JSON.parse(JSON.stringify(notes));  //make deep copy

      for(let i=0; i< newNotes.length; i++){
        const element = newNotes[i];
        if(element._id === id){
          newNotes[i].title=title;
          newNotes[i].description=description;
          newNotes[i].tag = tag;
          break;
        }
      }
      
      setNotes(newNotes)
    }

  return (
    <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
