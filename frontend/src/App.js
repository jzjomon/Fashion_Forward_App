import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CourtRegistration from './Pages/CourtRegistration';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/courtRegister' element={<CourtRegistration/>} />
      </Routes>
    </>
  )
}

export default App;
 