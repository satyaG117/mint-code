import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import ProblemForm from "../components/ProblemForm";
import './ProblemForm.css'
import useFetch from '../../shared/hooks/useFetch';
import { useAuth } from '../../shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoadingIcon from '../../shared/components/ui-elements/LoadingIcon';
import { useState } from 'react';


export default function NewProblem() {
  const [isLoading, setIsLoading] = useState(false);
  const makeRequest = useFetch();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleProblemSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const responseData = await makeRequest('http://localhost:8000/api/problems', 'POST', formData, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      })
      console.log(responseData);
      navigate(`/problems/${responseData.problemId}`);
    } catch (err) {
      console.log(err);
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

    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && (<LoadingIcon asOverlay={true} />)}
      <div className="problem-form-container">
        <div className="shadow p-3 mt-5 col-lg-8 offset-lg-2 col-10 offset-1 form-container bg-primary-subtle">
          <h3 className='mb-3'>Add a new problem</h3>
          <ProblemForm onSubmit={handleProblemSubmit} />
        </div>

      </div>
    </>
  )
}
