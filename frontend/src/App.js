import Login from './components/login/login';
import Register from './components/register/register';
import { Routes, Route } from 'react-router-dom'
import Profile from './components/profile/profile';
import mycontext from "./context/context"
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <mycontext.Provider value={useState({ name: "", email: "", url: "" })} >
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </mycontext.Provider>
    </div>
  );
}

export default App;
