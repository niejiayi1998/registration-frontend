import {Link} from "react-router-dom";

function AdvisorSidebar(){
    return (
        <div className="card">

            <div className="list-group list-group-flush">
                <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/advisor-edit-profile" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/ticket" className="list-group-item list-group-item-action">Ticket</Link>
                <Link to="/message" className="list-group-item list-group-item-action">Message</Link>


            </div>
        </div>
    )
}

export default AdvisorSidebar;