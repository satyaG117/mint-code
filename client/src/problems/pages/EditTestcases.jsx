import './EditTestcases.css'
import { useContext, useEffect, useState } from "react";
import useFetch from "../../shared/hooks/useFetch"
import { AuthContext } from "../../shared/contexts/AuthContext";
import { useParams } from "react-router-dom";
import LoadingIcon from '../../shared/components/ui-elements/LoadingIcon';
import TestcaseFormModal from '../components/TestcaseFormModal';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../shared/components/ui-elements/Modal';

export default function EditTestcases() {
    const makeRequest = useFetch();
    const auth = useContext(AuthContext);
    const { problemId } = useParams();
    const [problem, setProblem] = useState(null);
    const [testcases, setTestcases] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isNewTestcaseModalVisible, setIsNewTestcaseModalVisible] = useState(false);
    const [isEditTestcaseModalVisible, setIsEditTestcaseModalVisible] = useState(false);
    const [testcase, setTestcase] = useState(null);
    const [isTestcaseFormSubmitting, setIsTestcaseFormSubmitting] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);


    useEffect(() => {
        const fetchProblem = async () => {
            setIsLoading(true)
            try {
                let responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}?includeTestcases=true`, 'GET', null, {
                    'Authorization': `Bearer ${auth.token}`
                })
                setProblem({
                    title: responseData.title,
                    description: responseData.description,
                    difficulty: responseData.difficulty,
                    time_limit: responseData.time_limit,
                    memory_limit: responseData.memory_limit
                });

                setTestcases(responseData.testcases);
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

        fetchProblem()
    }, [problemId])

    const toggleDescriptionVisibility = () => {
        setIsDescriptionVisible(currentVal => !currentVal)
    }

    const handleNewTestcaseSubmit = async (formData) => {
        setIsTestcaseFormSubmitting(true);
        try {
            const responseData = await makeRequest(`http://localhost:8000/api/testcases/problem/${problemId}`, 'POST', formData, {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            });
            setTestcases(testcases => [...testcases, responseData]);
            setIsNewTestcaseModalVisible(false);
            toast.success('Testcase added successfully');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setIsTestcaseFormSubmitting(false);
        }
    }

    const handleTestcaseEditSubmit = async (formData) => {
        setIsTestcaseFormSubmitting(true);
        try {
            const responseData = await makeRequest(`http://localhost:8000/api/testcases/${testcase._id}`, 'PUT', formData, {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            });
            setTestcases(prevTestcases => prevTestcases.map(testcase =>
                testcase._id === responseData._id
                    ? { ...testcase, input: responseData.input, expected_output: responseData.expected_output }
                    : testcase
            ));
            setIsEditTestcaseModalVisible(false);
            toast.success('Testcase edited successfully');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setIsTestcaseFormSubmitting(false);
        }
    }

    const deleteTestcase = async () => {
        setIsDeleteModalVisible(false);
        setIsLoading(true);
        try {
            const responseData = await makeRequest(`http://localhost:8000/api/testcases/${testcase._id}`, 'DELETE', null,{
                'Authorization': `Bearer ${auth.token}`
            });
            toast.success('Testcase deleted successfully');
            setTestcases(prevTestcases => prevTestcases.filter(testcase => testcase._id !== responseData._id));
        } catch (err) {
            toast.error(err.message)
        } finally {
            setIsLoading(false);
        }
    }

    const openEditModal = (testcase) => {
        setTestcase(testcase);
        setIsEditTestcaseModalVisible(true);
    }

    const openDeleteModel = (testcase) => {
        setTestcase(testcase);
        setIsDeleteModalVisible(true);
    }

    return (
        <>
            {isLoading && <LoadingIcon asOverlay={true} />}
            <TestcaseFormModal
                title={"Add a testcase"}
                visible={isNewTestcaseModalVisible}
                isLoading={isTestcaseFormSubmitting}
                onClose={() => { setIsNewTestcaseModalVisible(false) }}
                onSubmit={handleNewTestcaseSubmit}
            />
            <TestcaseFormModal
                title={"Edit testcase"}
                visible={isEditTestcaseModalVisible}
                testcase={testcase}
                isLoading={isTestcaseFormSubmitting}
                onClose={() => { setIsEditTestcaseModalVisible(false) }}
                onSubmit={handleTestcaseEditSubmit}
            />
            <Modal
                title={"Alert!!"}
                onClose={() => { setIsDeleteModalVisible(false) }}
                visible={isDeleteModalVisible}
            >
                <p>Are you sure you want to delete this testcase ? This is irreversible. </p>
                <div>
                    <button className='btn btn-danger mx-2' onClick={deleteTestcase}>Yes</button>
                    <button className='btn btn-secondary mx-2' onClick={() => { setIsDeleteModalVisible(false) }}>No</button>
                </div>
            </Modal>
            <div className="testcases-container container-fluid">
                <div className="shadow p-3 mt-5 mb-2 col-lg-8 offset-lg-2 col-10 offset-1 bg-primary-subtle">
                    {problem && (
                        <>
                            <h3 className='mb-3'>{problem.title}</h3>
                            <hr />

                            {isDescriptionVisible && (<div dangerouslySetInnerHTML={{ __html: problem.description }} />)}
                            <button className='btn btn-light btn-sm' onClick={toggleDescriptionVisibility}>
                                {isDescriptionVisible ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>)
                                    :
                                    (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>)}
                            </button>
                        </>
                    )}

                    <hr />

                    {testcases.map((testcase, index) => {
                        return (
                            <div className='border border-warning p-2 mb-3' key={testcase._id}>
                                <span>Status : {testcase.public ? 'PUBLIC' : 'PRIVATE'}</span>
                                <p>Input : </p>
                                <p>{testcase.input}</p>
                                <p>Expected output : </p>
                                <p>{testcase.expected_output}</p>

                                <hr />
                                <button className='btn btn-sm btn-light mx-1' onClick={() => { openEditModal(testcase) }}>Edit</button>
                                <button className='btn btn-sm btn-danger mx-1' onClick={() => { openDeleteModel(testcase) }}>Delete</button>
                            </div>

                        )
                    })}
                    <hr />
                    <button className='btn btn-success' onClick={() => setIsNewTestcaseModalVisible(true)}>
                        Add testcase
                    </button>

                </div>

            </div>
        </>
    )
}
