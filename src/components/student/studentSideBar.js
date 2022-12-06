import {Link} from "react-router-dom";

function StudentSidebar(){
    return (
        <div className="card">

            <div className="list-group list-group-flush">
                <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/" className="list-group-item list-group-item-action">Register Course</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-action">Current Course</Link>
                <Link to="/edit-profile" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/user-login" className="list-group-item list-group-item-action">Logout</Link>
            </div>
        </div>
    )
}

export default StudentSidebar;