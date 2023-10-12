//import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import { TaskProvider } from './contexts/TaskContext';
import { ListProvider } from './contexts/ListContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
      <ListProvider>
      <TaskProvider>  
        <main className="relative bg-teal-400 h-[1099px] overflow-x-hidden"> 
          <nav className="w-full">
            <Navbar />
          </nav>
          <Routes>  
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </TaskProvider>
      </ListProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;
