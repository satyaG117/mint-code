import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Navbar from './shared/components/navigation/Navbar';
import Login from './users/pages/Login'
import Signup from './users/pages/Signup';
import Home from './shared/pages/Home';
import { AuthContext } from './shared/contexts/AuthContext';
import { useAuth } from './shared/hooks/useAuth';
import ProblemSet from './problems/pages/ProblemSet';
import AuthOnlyRoutes from './shared/components/protected-routes/AuthOnlyRoutes';

function App() {
  const { userId, token, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      userId,
      token,
      login,
      logout
    }}>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<AuthOnlyRoutes />}>
            <Route path='/problems' element={<ProblemSet />} />
          </Route>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
