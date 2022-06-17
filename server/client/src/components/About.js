import React, { createContext, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

function About() {
  const a = useContext(NoteContext);
  {console.log(a.name)}
  return (

    <div>
      this is about {a.name}
    </div>
  )
}

export default About
