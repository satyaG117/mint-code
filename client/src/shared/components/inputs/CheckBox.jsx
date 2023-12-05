
export default function CheckBox({ register, name, checked }) {
    return (
        <input className="form-check-input" {...register(name, {})} type="checkbox" role="switch" id={name} defaultChecked={checked}/>

    )
}
