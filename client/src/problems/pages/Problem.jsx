import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../shared/contexts/AuthContext";
import useFetch from "../../shared/hooks/useFetch";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from "../../shared/components/ui-elements/LoadingIcon";
import Dropdown from "../../shared/components/ui-elements/Dropdown";
import Modal from '../../shared/components/ui-elements/Modal'

export default function Problem() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const makeRequest = useFetch();
  const [problem, setProblem] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isConfirmModalVisible, setIsCofirmModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchProblem = async () => {
      setIsLoading(true);
      let responseData;

      try {
        if (auth.isLoggedIn) {
          responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}?includeTestcases=true`, 'GET', null, {
            'Authorization': `Bearer ${auth.token}`
          })
        } else {
          responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}`)
        }
        setProblem(responseData);
        console.log(responseData)
      } catch (err) {
        console.log(err);
        toast.error(err.message,);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProblem();
  }, [problemId])

  const openConfirmModal = () => {
    setIsCofirmModalVisible(true);
  }

  const closeConfirmModal = () => {
    setIsCofirmModalVisible(false);
  }

  const deleteProblem = async () => {
    try {
      closeConfirmModal();
      setIsDeleting(true);
      const responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}`, 'DELETE', null, {
        'Authorization': `Bearer ${auth.token}`
      })
      navigate('/problems');
    } catch (err) {
      toast.error(err.message)
    }
    finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      {isDeleting && <LoadingIcon asOverlay={true} />}
      <Modal
        visible={isConfirmModalVisible}
        onClose={closeConfirmModal}
        title={'Confirm'}
      >
        <p>Are you sure you want to delete this problem</p>
        <div>
          <button className="btn btn-light mx-1" onClick={closeConfirmModal}>No</button>
          <button className="btn btn-outline-danger mx-1" onClick={deleteProblem}>Yes</button>
        </div>
      </Modal>
      {isloading && (<div className="d-flex justify-content-center"><LoadingIcon /></div>)}
      {problem &&
        (
          <div className="mt-5 mx-md-4 mx-1">
            <h1>{problem.title}</h1>
            {

              auth.userId === problem.author && (
                <div>
                  {/* <Link to={`/problems/${problem._id}/edit`} className="btn btn-sm btn-light mx-2">
                  Edit
                </Link> */}
                  <Dropdown text={"Edit"}
                    size="btn-sm"
                    links={[
                      {
                        text: 'Problem',
                        to: `/problems/${problem._id}/edit`
                      },
                      {
                        text: 'Testcases',
                        to: `/problems/${problem._id}/testcases/edit`
                      },
                      {
                        text: 'Languages',
                        to: `/problems/${problem._id}/languages`
                      },
                    ]}
                  />
                  <button className="btn btn-sm btn-danger mx-2" onClick={openConfirmModal}>
                    Delete
                  </button>

                </div>
              )
            }
            <hr />

            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
          </div>
        )}
    </div>
  )
}
