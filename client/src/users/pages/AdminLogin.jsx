import { useContext, useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import useFetch from "../../shared/hooks/useFetch";
import { AuthContext } from "../../shared/contexts/AuthContext";

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const makeRequest = useFetch();
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    const handleAdminLoginSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const responseData = await makeRequest('http://localhost:8000/api/users/admin-login','POST',formData, {'Content-Type' : 'application/json'});
            console.log(responseData);
            auth.login(responseData.user.userId, responseData.token, 'admin');

            const nextURL = navigate.state?.from || '/problems';
            navigate(nextURL, {replace : true});
            
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
            <div className="form-bg">
                <div className="shadow p-3 mt-5 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1 form-container bg-primary-subtle">
                    <h3 className="mb-3">Admin Login</h3>
                    <LoginForm onSubmit={handleAdminLoginSubmit} isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}
