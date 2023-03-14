import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoutes from './components/PrivateRoutes';
import Home from './components/Home';
import Profile from './components/Profile';

const App = () => {

  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = localStorage.getItem('accessToken');
  const decodedToken = token ? jwt_decode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/profile/${userId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
        setUsername(response.data.user.name);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId && token) {
      fetchProfile();
    }
  }, [userId, token]);

  return ( 
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Register/>} path="/register"/>
        <Route element={<PrivateRoutes/>}>
          <Route element={<Home/>} path="/home" exact/>
          <Route element={<Profile/>} path="/profile" exact/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
