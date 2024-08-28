import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Otp from './pages/Otp';
import Error from './pages/Error';
import Headers from './components/Headers';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [message, setMessage] = useState("");

  // Fetching message from backend on mount
  // useEffect(() => {
  //   fetch("https://my-app-1-s1m8.onrender.com")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return <>
    <Headers />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/user/otp' element={<Otp />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </>;
}

export default App;


