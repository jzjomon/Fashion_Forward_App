import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CourtRegistration from './Pages/CourtRegistration';
import MyCourts from './Pages/MyCourts';
import { useSelector } from 'react-redux';
import OpenCourt from './Pages/OpenCourt';

function App() {
  const auth = useSelector((state) => state.user.user);
  return (
    <>
      <Routes>
        <Route path='/' element={auth ? <Home /> : <Login />} />
        <Route path='/home' element={auth ? <Home /> : <Login />} />
        <Route path='/courtRegister' element={auth ? <CourtRegistration /> : <Login />} />
        <Route path='/myCourts/:id' element={auth ? <MyCourts /> : <Login />} />
        <Route path='/openCourt/:id' element={auth ? <OpenCourt /> : <Login />} />
      </Routes>
    </>
  )
}

export default App;
