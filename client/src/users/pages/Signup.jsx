import { Link } from 'react-router-dom'

import SignupForm from '../components/SignupForm'
import './AuthForms.css'

export default function Signup() {
  return (
    <div className='form-bg'>
      <div className="shadow p-3 mt-5 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1 form-container bg-primary-subtle">
        <h3 className='mb-3'>Signup</h3>
        <SignupForm />
        <span>Already have an account ? </span><Link to="/login">Login</Link>
      </div>
    </div>
  )
}
