import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import useFetch from "../../shared/hooks/useFetch"
import { AuthContext } from "../../shared/contexts/AuthContext";
import LoadingIcon from "../../shared/components/ui-elements/LoadingIcon";

export default function LanguageSupport() {
  const { problemId } = useParams();
  const makeRequest = useFetch();
  const auth = useContext(AuthContext);
  const [problem, setProblem] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(prevState => !prevState)
  }

  useEffect(() => {
    const fetchProblem = async () => {
      setIsLoading(true)
      try {
        let responseData = await makeRequest(`http://localhost:8000/api/problems/${problemId}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        setProblem(responseData);
        console.log(responseData);
      } catch (err) {
        toast.error(err.message)
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }
    fetchProblem();
  }, [problemId])

  return (
    <>
      {isLoading && (<LoadingIcon asOverlay={true} />)}
      <div className="m-3">
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
        <div className="my-3">
          {problem?.language_support.length > 0 && <h3>Supported languages</h3>}
          {problem?.language_support?.map((lang, index) => {
            <Link to={`/problems/${problemId}/languages/${lang._id}`} key={lang._id}>{lang.name}</Link>
          })}

          <Link className="btn btn-light" to={`/problems/${problemId}/languages/edit`}>Edit language support</Link>
        </div>
      </div>
    </>
  )
}
