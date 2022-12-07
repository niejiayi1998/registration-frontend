import {Link} from "react-router-dom";

function StudentSidebar(){
    return (
        <div className="card">

            <div className="list-group list-group-flush">
                <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/" className="list-group-item list-group-item-action">Browse Courses</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-action">Current Courses</Link>
                <Link to="/student-edit-profile" className="list-group-item list-group-item-action">Profile Setting</Link>
            </div>
        </div>
    )
}

export default StudentSidebar;