import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-black">
            <div className="container-fluid">
                <span className="navbar-brand">MintCode</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">

                    </div>
                    <div className="navbar-nav ms-auto">
                        <NavLink className="nav-link" end to="/">Problems</NavLink>
                        <NavLink className="nav-link" end to="/login">Login</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
