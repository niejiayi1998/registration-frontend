import {Link} from "react-router-dom";

const Navbar = () => {
    const adminLoginStatus = localStorage.getItem("adminLoginStatus");
    const advisorLoginStatus = localStorage.getItem("advisorLoginStatus");
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");

    let currentUser = null;
    if (adminLoginStatus) {
        currentUser = "admin";
    } else if (advisorLoginStatus) {
        currentUser = "advisor";
    } else if (studentLoginStatus) {
        currentUser = "student";
    }

    const users = ["admin", "advisor", "student"];

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Khoury Registration</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/all-courses">Courses</Link>
                        </li>

                        {
                            currentUser &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-capitalize" href="src/components/boilerplates/navbar#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {currentUser}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={`/${currentUser}-dashboard`}>Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                </ul>
                            </li>
                        }

                        {
                            !currentUser &&
                            <>
                                {users.map((u, index) =>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-capitalize" href="src/components/boilerplates/navbar#" role="button" data-bs-toggle="dropdown"
                                           aria-expanded="false">
                                            {u}
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={`${u}-login`}>Login</Link></li>
                                            <li><Link className="dropdown-item" to={`${u}-register`}>Register</Link></li>
                                        </ul>
                                    </li>
                                )}
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;