import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Events from './Events';
import Navbar from './Navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/events' element={<Events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
