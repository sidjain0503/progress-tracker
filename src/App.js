import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Header from './Components/Header/Header';
import Tasks from './Components/Tasks/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Networktable from './Components/NetworkTable/Networktable';



function App() {
  return (
    <>
     <ToastContainer position='top-center' />

     <Routes>
     <Route path='*' element={<><h1 style={{ textAlign: "center" }}>Page Not  Found </h1></>} />

     <Route path='/network' element={<><Header/><Networktable/></>} />
     <Route path='/other' element={<><Header/><Tasks ttype={"other"}/></>} />
     <Route path='/college' element={<><Header/><Tasks ttype={"college"}/></>} />
     <Route path='/programming' element={<><Header/><Tasks ttype="programming"/></>} />
     <Route path='/' element={<><Header/><Home/></>} />

     </Routes>
    </>
  );
}

export default App;
