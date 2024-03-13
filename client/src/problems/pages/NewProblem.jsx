import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import ProblemForm from "../components/ProblemForm";
import './ProblemForm.css'
import useFetch from '../../shared/hooks/useFetch';
// import { useAuth } from '../../shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../shared/contexts/AuthContext';


export default function NewProblem() {
  const [isSubmitting, setisSubmitting] = useState(false);
  const makeRequest = useFetch();
  const auth = useContext(AuthContext)
  const navigate = useNavigate();

  const handleProblemSubmit = async (formData) => {
    console.log(formData);
    formData.time_limit = parseFloat(formData.time_limit);
    formData.memory_limit = parseFloat(formData.memory_limit);
    try {
      setisSubmitting(true);
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
      setisSubmitting(false);
    }
  }
  return (
    <>
      <div className="problem-form-container container-fluid">
        <div className="shadow p-3 mt-5 mb-2 col-lg-8 offset-lg-2 col-10 offset-1 bg-primary-subtle">
          <h3 className='mb-3'>Add a new problem</h3>
          <ProblemForm onSubmit={handleProblemSubmit} isLoading={isSubmitting} />

        </div>

      </div>
      {/* <ProblemForm onSubmit={handleProblemSubmit} /> */}
    </>
  )
}
