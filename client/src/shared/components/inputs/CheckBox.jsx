
export default function CheckBox({ register, name, disabled, defaultChecked,checked }) {
    return (
        <input className="form-check-input" {...register(name, {})} type="checkbox" role="switch" id={name} defaultChecked={defaultChecked} disabled={disabled} checked={checked}/>

    )
}
