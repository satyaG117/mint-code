export default function SelectInput({options , defaultOption , register , name}) {
    return (
        <select className="form-select bg-primary-subtle border border-warning" defaultValue={defaultOption} {...register(name, {})}>
            {options.map((option, index)=>{
                return(<option key={index} value={option.value} >{option.text}</option>)
            })}
        </select>
    )
}
