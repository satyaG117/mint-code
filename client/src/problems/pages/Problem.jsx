import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../shared/contexts/AuthContext";
import useFetch from "../../shared/hooks/useFetch";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from "../../shared/components/ui-elements/LoadingIcon";
import Dropdown from "../../shared/components/ui-elements/Dropdown";

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
                <div>
                {/* <Link to={`/problems/${problem._id}/edit`} className="btn btn-sm btn-light mx-2">
                  Edit
                </Link> */}
                <Dropdown text={"Edit"}
                size="btn-sm"
                links = {[
                  {
                    text : 'Problem',
                    to : `/problems/${problem._id}/edit`
                  },
                  {
                    text : 'Testcases',
                    to : `/problems/${problem._id}/testcases/edit`
                  },
                  {
                    text : 'Languages',
                    to : `/problems/${problem._id}/languages`
                  },
                ]}
                />
                <button className="btn btn-sm btn-danger mx-2">
                  Delete
                </button>
                
              </div>
              )
            }
            <hr/>

            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
          </div>
        )}
    </div>
  )
}
