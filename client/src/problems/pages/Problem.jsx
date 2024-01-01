import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from "../../shared/contexts/AuthContext";
import useFetch from "../../shared/hooks/useFetch";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from "../../shared/components/ui-elements/LoadingIcon";

export default function Problem() {
  const { problemId } = useParams();
  const auth = useContext(AuthContext);
  const makeRequest = useFetch();
  const [problem, setProblem] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      setIsLoading(true);
      let responseData;

      try {
        if (auth.isLoggedIn) {
          responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}`, 'GET', null, {
            'Authorization': `Bearer ${auth.token}`
          })
        } else {
          responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}`)
        }
        setProblem(responseData);
        console.log(responseData)
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
    fetchProblem();
  }, [problemId])

  return (
    <div>
      {isloading && (<div className="d-flex justify-content-center"><LoadingIcon /></div>)}
      {problem &&
        (
          <div className="mt-5 mx-md-4 mx-1">
            <h1>{problem.title}</h1>
            {
              auth.userId === problem.author && (
                <Link to={`/problems/${problem._id}/edit`} className="btn btn-light">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </Link>
              )
            }

            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
          </div>
        )}
    </div>
  )
}
