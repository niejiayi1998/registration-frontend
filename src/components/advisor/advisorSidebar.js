import {Link} from "react-router-dom";

function AdvisorSidebar(){
    return (
        <div className="card">

            <div className="list-group list-group-flush">
                <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/" className="list-group-item list-group-item-action">All Courses</Link>
                <Link to="/advisor-edit-profile" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/all-students" className="list-group-item list-group-item-action">All Students</Link>
            </div>
        </div>
    )
}

export default AdvisorSidebar;