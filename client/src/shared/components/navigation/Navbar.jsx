import { NavLink } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../../contexts/AuthContext"

export default function Navbar() {
    const auth = useContext(AuthContext);
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
                        <NavLink className="nav-link" end to="/problems">Problems</NavLink>
                        {/* <NavLink className="nav-link" end to="/test">test</NavLink> */}
                        {auth.isLoggedIn ?
                            (<>
                                {auth.role === 'admin' && (
                                    <NavLink className="nav-link" end to="/problems/new">New Problem</NavLink>
                                )}
                                <NavLink className="nav-link" end to="/profile">Profile</NavLink>
                                <button onClick={auth.logout} className="btn nav-link">Logout</button>
                            </>)
                            :
                            (<>
                                <NavLink className="nav-link" end to="/login">Login</NavLink>
                                <NavLink className="nav-link" end to="/admin-login">Admin Login</NavLink>
                            </>)}
                    </div>
                </div>
            </div>
        </nav>
    )
}
