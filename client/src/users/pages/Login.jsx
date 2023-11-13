import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from '../components/LoginForm';
import './AuthForms.css'
import { AuthContext } from '../../shared/contexts/AuthContext';
import useFetch from '../../shared/hooks/useFetch';
import Modal from '../../shared/components/ui-elements/Modal';
import LoadingIcon from '../../shared/components/ui-elements/LoadingIcon';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const makeRequest = useFetch();
    const handleLoginSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const responseData = await makeRequest('http://localhost:8000/api/users/login', 'POST', formData, { 'Content-Type': 'application/json' })
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
        <>
            <div className='form-bg'>
                <div className="shadow p-3 mt-5 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1 form-container bg-primary-subtle">
                    <h3 className='mb-3'>Login</h3>
                    <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
                    <span>Need an account ? </span><Link to="/signup">Signup</Link>
                </div>
            </div>
        </>
    )
}
