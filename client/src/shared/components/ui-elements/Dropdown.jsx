import { Link } from "react-router-dom"

export default function Dropdown({text, links, size='', theme='light' }) {
    return (
        <div className="btn-group">
            <button type="button" className={`btn btn-${theme} ${size} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                {text}
            </button>
            <ul className="dropdown-menu">
                {links.map((link,index)=>{
                    return (<li><Link className="dropdown-item" to={link.to} key={index}>{link.text}</Link></li>)
                })}
            </ul>
        </div>
    )
}
