import Login from './components/login/login';
import Register from './components/register/register';
import { Routes, Route } from 'react-router-dom'
import Profile from './components/profile/profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
