import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlertState from './context/alert/AlertState';
import NoteState from './context/notes/NoteState'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login'
import Signup from './components/Signup'
import Error from './components/Error';


function App() {

  return (
    <>
    <AlertState>
      <NoteState>
        <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>   
              <Route exact path="about" element={<About />}/>
              <Route exact path="login" element={<Login />}/>
              <Route exact path="signup" element={<Signup />}/>
              <Route exact path="*" element={<Error />}/>

            </Routes>
          </BrowserRouter>
      </NoteState>
    </AlertState>
    
    </>
  );
}

export default App;
