import { Link , useNavigate } from 'react-router-dom'
import { useContext } from 'react';

import LoginForm from '../components/LoginForm';
import './AuthForms.css'
import { AuthContext } from '../../shared/contexts/AuthContext';



export default function Login() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const handleLoginSubmit = (formData) => {
        console.log(formData);
        auth.login('some-demo-token', 'some-demo-user-id');
        navigate('/problems')
    }

    return (
        <div className='form-bg'>
            <div className="shadow p-3 mt-5 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1 form-container bg-primary-subtle">
                <h3 className='mb-3'>Login</h3>
                <LoginForm onSubmit={ handleLoginSubmit} />
                <span>Need an account ? </span><Link to="/signup">Signup</Link>
            </div>
        </div>
    )
}
