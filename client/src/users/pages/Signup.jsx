import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { useContext } from 'react';

import SignupForm from '../components/SignupForm'
import './AuthForms.css'
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/contexts/AuthContext';

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const makeRequest = useFetch();
  const auth = useContext(AuthContext);
  
  const handleSignupSubmit = async (formData) => {
    setIsLoading(true);
    delete formData.retypedPass;
    try {
      const responseData = await makeRequest('http://localhost:8000/api/users/signup', 'POST', formData, { 'Content-Type': 'application/json' })
      console.log(responseData);
      auth.login(responseData.user.userId, responseData.token);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(err);
    }
    setIsLoading(false);
  }

  return (
    <div className='form-bg'>
      <div className="shadow p-3 mt-5 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1 form-container bg-primary-subtle">
        <h3 className='mb-3'>Signup</h3>
        <SignupForm onSubmit={handleSignupSubmit} isLoading={isLoading} />
        <span>Already have an account ? </span><Link to="/login">Login</Link>
      </div>
    </div>
  )
}
