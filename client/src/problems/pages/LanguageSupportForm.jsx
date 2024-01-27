import Split from 'react-split'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import './LanguageSupportForm.css'
import CodeEditor from '../../shared/components/inputs/CodeEditor'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../shared/hooks/useFetch';
import LoadingIcon from '../../shared/components/ui-elements/LoadingIcon';
import Modal from '../../shared/components/ui-elements/Modal';
import SelectInputManual from '../components/SelectInputManual';
import { AuthContext } from '../../shared/contexts/AuthContext';


export default function LanguageSupportForm() {

  const { problemId } = useParams();
  const navigate = useNavigate();

  const [languages, setLanguages] = useState([]);
  const [imports, setImports] = useState('');
  const [userCode, setUserCode] = useState('');
  const [driverCode, setDriverCode] = useState('');
  const [currentLanguageId, setCurrentLanguageId] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isClearButtonDisabled, setIsClearButtonDisabled] = useState(false)
  const [langSupportId, setLangSupportId] = useState(null);

  const makeRequest = useFetch();
  const auth = useContext(AuthContext)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        const responseData = await makeRequest('http://localhost:8000/api/languages');
        setLanguages(responseData.map((lang, index) => {
          return {
            text: lang.name,
            value: `${lang._id}+${lang.editor_code}`
          }

        }))
        setCurrentLanguageId(responseData[0]._id);
        setCurrentLanguage(responseData[0].editor_code);

      } catch (err) {
        console.log(err);
        setIsErrorModalVisible(true);
        setError(err.message)
      } finally {
        setIsLoading(false);
      }
    }

    fetchLanguages()
  }, [])

  const handleLanguageChange = (e) => {
    setCurrentLanguageId(e.target.value.split('+')[0])
    setCurrentLanguage(e.target.value.split('+')[1])
  }

  useEffect(() => {
    const fetchLanguageSupport = async () => {
      if (!currentLanguageId) return;

      try {
        setIsLoading(true);
        const responseData = await makeRequest(`http://localhost:8000/api/languages/problem/${problemId}/language/${currentLanguageId}`);
        setImports(responseData.imports)
        setUserCode(responseData.user_code)
        setDriverCode(responseData.driver_code)
        setIsClearButtonDisabled(false);
      } catch (err) {
        if (err.message === 'Resource not found') {
          setIsClearButtonDisabled(true);
          setImports('');
          setUserCode('');
          setDriverCode('');
        } else {
          setIsErrorModalVisible(true);
          setError(err.message)
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchLanguageSupport();
  }, [currentLanguageId])

  const closeErrorModal = () => {
    setIsErrorModalVisible(false);
  }

  const deleteLanguageSupport = async () => {
    setIsLoading(true);
    try{
      const responseData = await makeRequest(`http://localhost:8000/api/languages/problem/${problemId}/language/${currentLanguageId}`, 'DELETE', null , {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      });
      setImports('');
      setUserCode('');
      setDriverCode('');
      toast.info('Deleted successfully')
      setIsClearButtonDisabled(true);
    }catch(err){

    }finally{
      setIsLoading(false);
    }
  }

  const handleCodeSave = async () => {
    console.log(imports)
    console.log(userCode)
    console.log(driverCode)
    if (imports == '' && userCode == '' && driverCode == '') {
      deleteLanguageSupport();
      return;
    }
    try {
      setIsLoading(true);
      const responseData = await makeRequest(`http://localhost:8000/api/languages/problem/${problemId}/language/${currentLanguageId}`, 'PUT', {
        imports: imports, user_code: userCode, driver_code: driverCode
      }, {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      });
      toast.success('Saved successfully')
      setIsClearButtonDisabled(false);

    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <LoadingIcon asOverlay={true} />}
      <Modal
        title='ERROR'
        visible={isErrorModalVisible}
        onClose={closeErrorModal}
      >
        <p>{error}</p>
        <div className="d-flex justify-content-around">
          <button className="btn btn-info" onClick={() => { navigate(-1) }}>Go back</button>
          <button className="btn btn-info" onClick={() => { window.location.reload() }}>Reload page</button>
        </div>
      </Modal>
      <div className="langsupport-form-container bg-primary-subtle">
        {/* title and lang selector goes here */}
        <div className='langsupport-form-header'>
          <div className='row mt-2 mx-3'>
            {languages.length > 0 && (
              <>
                <div className='col-md-3 col-6'>
                  <SelectInputManual
                    name={'language-selector'}
                    value={`${currentLanguageId}+${currentLanguage}`}
                    options={languages}
                    onChange={handleLanguageChange}
                  />
                </div>
                <div className='col-md-1 col-2'>
                  <button className='btn btn-danger' onClick={deleteLanguageSupport} disabled={isClearButtonDisabled}>Clear</button>
                </div>
              </>)}

          </div>
        </div>
        {/* editors goes here */}
        <div className='editor-section border'>
          <Split
            className="split"
          >
            <div className='editor-pane'>
              <div className='p-1 bg-light-subtle'>Imports</div>
              <div className="editor-container">
                <CodeEditor
                  value={imports}
                  onChange={setImports}
                  language={currentLanguage}
                />
              </div>
            </div>
            <div className='editor-pane'>
              <div className='p-1 bg-light-subtle'>User code</div>
              <div className="editor-container">
                <CodeEditor
                  value={userCode}
                  onChange={setUserCode}
                  language={currentLanguage}
                />
              </div>
            </div>
            <div className='editor-pane'>
              <div className='p-1 bg-light-subtle'>Driver code</div>
              <div className="editor-container">
                <CodeEditor
                  value={driverCode}
                  onChange={setDriverCode}
                  language={currentLanguage}
                />
              </div>
            </div>
          </Split>
        </div>
        {/* submit button */}
        <div className='bg-primary-subtle langsupport-form-footer'>
          <button className='btn btn-success mt-2 mx-3' onClick={handleCodeSave}>Save</button>
        </div>
      </div>
    </>
  )
}
