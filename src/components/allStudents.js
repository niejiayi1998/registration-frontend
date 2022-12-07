import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import AdminSidebar from "./admin/adminSidebar";
import AdvisorSidebar from "./advisor/advisorSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'
const AllStudents = () => {
    const advisorLoginStatus = localStorage.getItem("advisorLoginStatus");
    const adminLoginStatus = localStorage.getItem("adminLoginStatus");
    const [studentData, setStudentData] = useState([])

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/student`)
                .then((res) => {
                    setStudentData(res.data)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])


    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    {advisorLoginStatus && <AdvisorSidebar />}
                    {adminLoginStatus && <AdminSidebar />}
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All students</h5>
                        <ul className="list-group">
                            {studentData && studentData.map((s, index) =>
                                <Link to={`/student/${s.id}`} key={index} className="list-group-item">{s.full_name}</Link>
                            )}
                        </ul>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default AllStudents;