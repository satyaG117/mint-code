
import './TextArea.css'

export default function TextArea({placeholder = "", name, rules, rows, cols, register, error}) {
    return (
        <>
            <textarea
                placeholder={placeholder}
                className="form-control shadow-none text-area"
                id={name}
                {...register(name, rules)}
                rows={rows}
                cols={cols}

            >
            </textarea>
            {error && (<small className="error-msg text-warning">{error.message}</small>)}
        </>
    )
}
