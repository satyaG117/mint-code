import {Link} from 'react-router-dom'
import LoginForm from '../components/LoginForm';
import './AuthForms.css'

export default function Login() {

    return (
        <div className="shadow p-3 mt-5 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1 login-form-container bg-primary-subtle">
            <h3 className='mb-3'>Login</h3>
            <LoginForm /> 
            <span>Need an account ? </span><Link to="/signup">Signup</Link>
        </div>
    )
}
