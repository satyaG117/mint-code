import { useContext, useState } from "react"
import ProblemForm from "../components/ProblemForm"
import useFetch from "../../shared/hooks/useFetch";
import Modal from "../../shared/components/ui-elements/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function EditProblem() {
    const [isLoading, setIsLoading] = useState(false);
    const [problem, setProblem] = useState(null);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [error, setError] = useState('');
    const makeRequest = useFetch();
    const navigate = useNavigate();
    const { problemId } = useParams();
    const auth = useContext(AuthContext);

    useState(() => {
        const fetchProblem = async () => {
            setIsLoading(true)
            try {
                let responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}`, 'GET', null, {
                    'Authorization': `Bearer ${auth.token}`
                })
                setProblem(responseData);
                console.log(responseData);
            } catch (err) {
                setIsErrorModalVisible(true)
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProblem();
    }, [])

    const handleErrorModalClose = () => {
        setIsErrorModalVisible(false);
        navigate(-1)
    }

    const handleProblemSubmit = async (formData) => {
        setIsLoading(true);
        try {
            let responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}`, 'PUT', formData, {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            })
            navigate(`/problems/${problemId}`);
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
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Modal
                title={"ERROR"}
                onClose={handleErrorModalClose}
                visible={isErrorModalVisible}
            >
                <p>{error}</p>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => { navigate(-1) }}>Go back</button>
                    <button className="btn btn-info" onClick={() => { window.location.reload() }}>Reload page</button>
                </div>
            </Modal>
            <div className="problem-form-container container-fluid">
                <div className="shadow p-3 mt-5 mb-2 col-lg-8 offset-lg-2 col-10 offset-1 bg-primary-subtle">
                    <h3 className='mb-3'>Edit problem</h3>
                    <ProblemForm onSubmit={handleProblemSubmit} isLoading={isLoading} problem={problem} />

                </div>

            </div>
        </>
    )
}
