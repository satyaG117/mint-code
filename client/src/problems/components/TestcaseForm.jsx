import { useForm } from "react-hook-form"
import TextArea from "../../shared/components/inputs/TextArea"
import { useEffect } from "react"
import CheckBox from "../../shared/components/inputs/CheckBox"
import LoadingIcon from "../../shared/components/ui-elements/LoadingIcon"

export default function TestcaseForm({ testcase, onSubmit, isLoading }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        if (testcase) {
            setValue('input', testcase.input)
            setValue('expected_output', testcase.expected_output);
            setValue('public', testcase.public)
        }
    }, [])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-check form-switch mb-3">
                <label className="form-check-label" htmlFor="public">Set testcase to public ?</label>
                <CheckBox register={register} name="public" />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Input</label>
                <TextArea
                    name={"input"}
                    register={register}
                    rules={{}}
                    rows={5}
                    cols={50}
                    error={errors.input}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Expected Output</label>
                <TextArea
                    name={"expected_output"}
                    register={register}
                    rules={{}}
                    rows={5}
                    cols={50}
                    error={errors.expected_output}
                />
            </div>
            <button className="btn btn-success" disabled={isLoading}>{isLoading ? (<LoadingIcon />)  : 'Submit'}</button>
        </form>

    )
}
