import {Link} from "react-router-dom";

const Navbar = () => {
    const adminLoginStatus = localStorage.getItem("adminLoginStatus");
    const advisorLoginStatus = localStorage.getItem("advisorLoginStatus");
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");

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

                        {/* admin */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="src/components/boilerplates/navbar#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Admin
                            </a>
                            <ul className="dropdown-menu">
                                {!adminLoginStatus &&
                                    <>
                                        <li><Link className="dropdown-item" to="/admin-login">Login</Link></li>
                                        <li><Link className="dropdown-item" to="/admin-register">Register</Link></li>
                                    </>
                                }
                                <li><Link className="dropdown-item" to="/admin-dashboard">Dashboard</Link></li>
                                {adminLoginStatus &&
                                    <li><Link className="dropdown-item" to="/admin-logout">Logout</Link></li>
                                }

                            </ul>
                        </li>

                        {/* advisor */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="src/components/boilerplates/navbar#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Advisor
                            </a>
                            <ul className="dropdown-menu">
                                {!advisorLoginStatus &&
                                    <>
                                        <li><Link className="dropdown-item" to="/advisor-login">Login</Link></li>
                                        <li><Link className="dropdown-item" to="/advisor-register">Register</Link></li>
                                    </>
                                }
                                <li><Link className="dropdown-item" to="/advisor-dashboard">Dashboard</Link></li>
                                {advisorLoginStatus &&
                                    <li><Link className="dropdown-item" to="/advisor-logout">Logout</Link></li>
                                }

                            </ul>
                        </li>

                        {/* student */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="src/components/boilerplates/navbar#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Student
                            </a>
                            <ul className="dropdown-menu">
                                {!studentLoginStatus &&
                                    <>
                                        <li><Link className="dropdown-item" to="/student-login">Login</Link></li>
                                        <li><Link className="dropdown-item" to="/student-register">Register</Link></li>
                                    </>
                                }
                                <li><Link className="dropdown-item" to="/student-dashboard">Dashboard</Link></li>
                                {studentLoginStatus &&
                                    <li><Link className="dropdown-item" to="/student-logout">Logout</Link></li>
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;