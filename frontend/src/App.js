import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CourtRegistration from './Pages/CourtRegistration';
import MyCourts from './Pages/MyCourts';
import { useSelector } from 'react-redux';
import OpenCourt from './Pages/OpenCourt';
import FourNotFour from './Pages/404';
import { Spinner } from '@material-tailwind/react';

function App() {
  const auth = useSelector((state) => state.user.user);
  const { spinner } = useSelector(state => state.spinner);

  return (
    <>
      {spinner && <div className='fixed top-0 right-0 left-0 w-full bg-blue-gray-300 h-[100vh] flex justify-center items-center z-50'>
        <Spinner className='h-16 w-16' color='orange' />
      </div>}
      <Routes>
        <Route path='*' element={<FourNotFour />} />
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
