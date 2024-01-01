import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import QuillEditor from '../../shared/components/inputs/QuillEditor';
import TextInput from '../../shared/components/inputs/TextInput';
import CheckBox from '../../shared/components/inputs/CheckBox';
import SelectInput from '../../shared/components/inputs/SelectInput';
import LoadingIcon from '../../shared/components/ui-elements/LoadingIcon';


const difficultyOptions = [
    {
        value: 'easy',
        text: 'Easy'
    },
    {
        value: 'medium',
        text: 'Medium'
    },
    {
        value: 'hard',
        text: 'Hard'
    }
]

export default function ProblemForm({ onSubmit, problem, isLoading }) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    // const [defaultOption , setDefaultOption] = useState('');
    const [editorValue, setEditorValue] = useState('')

    const handleEditorChange = (content) => {
        setValue('description', content);
    }

    useEffect(() => {
        setValue('description', '')
    }, [])

    useEffect(() => {
        if (!problem) return;

        // setDefaultOption(problem.difficulty)
        setValue('title', problem.title);
        setValue('description', problem.description);
        setEditorValue(problem.description)
        setValue('time_limit', problem.time_limit.toString());
        setValue('memory_limit', problem.memory_limit.toString());
        setValue('difficulty',problem.difficulty)
    }, [problem])

    return (
        <>
        {isLoading && (<LoadingIcon asOverlay={true}/>)}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-check form-switch mb-3">
                    <label className="form-check-label" htmlFor="private">Set question to private ?</label>
                    <CheckBox register={register} name="private" defaultChecked={problem?.private ? problem.private : true} />
                    <br />
                    <small className='text-warning'>NOTE : A question while being private won't be listed and the submission won't be counted. Use for testing or troubleshooting</small>
                    <br />
                    <small className='text-warning'>NOTE : A question needs to have atleast one testcase and one language support so that it can be set to public</small>

                </div>
                <hr />
                <div className='mb-3'>
                    <label className='form-label'>Title *</label>
                    <TextInput
                        name={"title"}
                        placeholder={""}
                        type={"text"}
                        register={register}
                        rules={{
                            required: 'Title is required',

                        }}
                        error={errors.title}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <div className='quill-editor-container' style={{ height: '450px' }}>
                        <QuillEditor
                            editorContainer={".quill-editor-container"}
                            handleEditorChange={handleEditorChange}
                            height="400px"
                            placeholder={"Add a description.."}
                            value={editorValue}
                        />
                    </div>
                    {errors?.description?.message && (<small className="error-msg text-warning">{errors.description.message}</small>)}
                </div>


                <div className='row mb-3'>
                    <div className='col'>
                        <label className='form-label'>Time limit (in seconds) </label>
                        <TextInput
                            name={"time_limit"}
                            placeholder={""}
                            type={"text"}
                            register={register}
                            rules={{
                                pattern: {
                                    value: /^\d*\.?\d+$/,
                                    message: 'Only numbers are allowed'
                                }
                            }}
                            error={errors.time_limit}
                        />
                    </div>
                    <div className='col'>
                        <label className='form-label'>Memory limit (in kbs)</label>
                        <TextInput
                            name={"memory_limit"}
                            placeholder={""}
                            type={"text"}
                            register={register}
                            rules={{
                                pattern: {
                                    value: /^\d*\.?\d+$/,
                                    message: 'Only numbers are allowed'
                                }
                            }}
                            error={errors.memory_limit}
                        />
                    </div>
                    <div className='col'>
                        <label className='form-label'>Difficulty</label>
                        <SelectInput
                            name={'difficulty'}
                            register={register}
                            options={difficultyOptions}
                            defaultOption={'easy'}
                        />

                    </div>

                </div>
                <hr />
                <div className='d-grid gap-2'>
                    <button className='btn btn-success'>Save</button>

                </div>

            </form>
        </>
    )
}
