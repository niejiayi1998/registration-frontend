import {Link} from "react-router-dom";

function AdminSidebar(){
    return (
        <div className="card">

            <div className="list-group list-group-flush">
                <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/" className="list-group-item list-group-item-action">All Courses</Link>
                <Link to="/add-course" className="list-group-item list-group-item-action">Add Course</Link>
                <Link to="/edit-profile" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/all-students" className="list-group-item list-group-item-action">All Students</Link>
                <Link to="/user-login" className="list-group-item list-group-item-action">Logout</Link>
            </div>
        </div>
    )
}

export default AdminSidebar;