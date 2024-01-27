export default function SelectInputManual({ options, name, value, onChange }) {
    return (
        <select className="form-select bg-primary-subtle border border-warning" name={name} value={value} onChange={onChange}>
            {options?.map((option, index) => {
                return (<option key={index} value={option.value} >{option.text}</option>)
            })}
        </select>
    )
}
