import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import AdminSidebar from "./admin/adminSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'
const AllStudents = () => {
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
                    <AdminSidebar />
                </aside>
                <section className="col-md-9">
                <h3 className="mb-4">All Students</h3>
                <ul className="list-group">
                    {studentData && studentData.map((s, index) =>
                        <Link to={`/student/${s.id}`} key={index} className="list-group-item">{s.full_name}</Link>
                    )}
                </ul>
                </section>
            </div>

        </div>
    )
}

export default AllStudents;