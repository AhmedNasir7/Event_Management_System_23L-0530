import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Events from './Events';
import Navbar from './Navbar';
import EventsDetails from './EventsDetails';
import MyEvents from './MyEvents';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:id' element={<EventsDetails />} />
          <Route path='/my-events' element={<MyEvents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
