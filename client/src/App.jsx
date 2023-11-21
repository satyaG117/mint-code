import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import './App.css'
import Navbar from './shared/components/navigation/Navbar';
import Login from './users/pages/Login'
import Signup from './users/pages/Signup';
import Home from './shared/pages/Home';
import { AuthContext } from './shared/contexts/AuthContext';
import { useAuth } from './shared/hooks/useAuth';
import ProblemSet from './problems/pages/ProblemSet';
import AuthOnlyRoutes from './shared/components/protected-routes/AuthOnlyRoutes';
import UnauthorizedOnlyRoutes from './shared/components/protected-routes/UnauthorizedOnlyRoutes'
import AdminLogin from './users/pages/AdminLogin';
import Test from './shared/Test';
import NewProblem from './problems/pages/NewProblem';

function App() {
  const { userId, token, role, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      userId,
      token,
      role,
      login,
      logout
    }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route element={<AuthOnlyRoutes allowedRoles={["user", "admin"]} redirectTo={"/login"} />}>
            <Route path='/test' element={<Test />} />
            <Route path='/problems' element={<ProblemSet />} />
          </Route>

          <Route element={<AuthOnlyRoutes allowedRoles={["admin"]} redirectTo={"admin-login"} />}>
            <Route path='/problems/new/' element={<NewProblem />} />
          </Route>

          <Route element={<UnauthorizedOnlyRoutes />}>
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AuthContext.Provider>
  )
}

export default App
