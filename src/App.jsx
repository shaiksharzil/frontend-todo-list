import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Tasks from './pages/Tasks'
import Nav from './components/Nav'
import Foot from './components/Foot'

const App = () => {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!hideNav && <Nav />}
      <main className='flex-grow'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:titleId"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideNav && <Foot />}
    </div>
  );
}

export default App