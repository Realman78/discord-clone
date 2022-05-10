import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


function App() {
  return <>
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        <Route path="/" element={<Dashboard />}/>
      </Routes>
    </Router>
    <ToastContainer />
  </>
}

export default App;
