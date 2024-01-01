import { useContext, useEffect, useState } from "react"
import useFetch from "../../shared/hooks/useFetch"
import { AuthContext } from "../../shared/contexts/AuthContext";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProblemList from "../components/ProblemList";
import LoadingIcon from "../../shared/components/ui-elements/LoadingIcon";

export default function ProblemSet() {
    const [problems, setProblems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const auth = useContext(AuthContext);
    const makeRequest = useFetch()

    useEffect(() => {
        const fetchProblems = async () => {
            let responseData
            try {
                setIsLoading(true);
                if (auth.isLoggedIn) {
                    responseData = await makeRequest('http://localhost:8000/api/problems', 'GET', null, {
                        'Authorization': `Bearer ${auth.token}`
                    })

                } else {
                    responseData = await makeRequest('http://localhost:8000/api/problems');
                }
                
                setProblems(responseData);
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
            }
            finally{
                setIsLoading(false);
            }
        }
        fetchProblems()
    }, [])

    return (
        <div className="my-5 mx-md-4 mx-1 p-md-2">
            <ProblemList problems={problems}/>
            {isLoading &&(<div className="mt-5 container d-flex justify-content-center"><LoadingIcon /></div>)}
        </div>
    )
}
