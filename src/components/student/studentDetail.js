import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../admin/adminSidebar";
import AdvisorSidebar from "../advisor/advisorSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'
const StudentDetail = () => {
    const [studentData, setStudentData] = useState({
        full_name: "",
        email: "",
        GPA: "",
    })

    const advisorLoginStatus = localStorage.getItem("advisorLoginStatus");
    const adminLoginStatus = localStorage.getItem("adminLoginStatus");

    const [courses, setCourses] = useState([]);

    const {student_id} = useParams();

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/student/${student_id}`)
                .then((res) => {
                    setStudentData(res.data)
                })
        } catch (e) {
            console.log(e)
        }

        try {
            axios.get(`${baseUrl}/my-course/${student_id}`)
                .then((res) => {
                    setCourses(res.data)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    {advisorLoginStatus && <AdvisorSidebar />}
                    {adminLoginStatus && <AdminSidebar />}
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Student Detail</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                Student Name : {studentData.full_name}
                            </div>
                            <div className="mb-3">
                                Student Email: {studentData.email}
                            </div>
                            <div className="mb-3">
                                Student GPA: {studentData.GPA}
                            </div>
                        </div>
                    </div>

                    <div className="card mt-2">
                        <h5 className="card-header">Student Course Registration</h5>
                        <div className="card-body">
                            <table className="table text-center">
                                <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Instructor</th>
                                    <th>Section</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map((course, index)=> {
                                    return (
                                        <tr key={index}>
                                            <td>{course.course}</td>
                                            <td>{course.instructor}</td>
                                            <td>{course.section_name}</td>
                                        </tr>
                                    )}
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default StudentDetail;