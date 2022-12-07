import {useEffect, useState} from "react";
import axios from "axios";
import StudentSidebar from "./student/studentSideBar";
const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const MyCourse = () => {

    const [courseData, setCourseData] = useState([]);
    const student_id = localStorage.getItem('studentId')
    //fetch student data
    useEffect(()=>{
        try{
            axios.get(baseUrl + '/my-course/' + student_id)
                .then((res)=> {
                    setCourseData(res.data);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

    //drop button
    const handleDropClick = (section, student) => {
        let ticketExisted = false;
        try {
            axios.get(`${baseUrl}/drop-ticket/${student}/${section}`)
                .then((res) => {
                    ticketExisted = res.data.bool;
                    if (! ticketExisted) {
                        const ticketFormData = new FormData();
                        ticketFormData.append("student",student);
                        ticketFormData.append("section", section);
                        ticketFormData.append("request", 'DROP');
                        ticketFormData.append("status", 2);
                        try {
                            axios.post(`${baseUrl}/ticket/`, ticketFormData)
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        alert("You have already submitted the drop request, please wait for advisor's approval!")
                    }
                })
        } catch (e) {
            console.log(e);
        }

    }
    return(
        <div className="container mt-4">
            <div className='row'>
                <aside className="col-md-3">
                    <StudentSidebar />
                </aside>
                <div className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body mb-3">
                            <table className="table text-center">
                                <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Instructor</th>
                                    <th>Section</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courseData.map((courses, index)=> {
                                    return (
                                        <tr key={index}>
                                            <td>{courses.course}</td>
                                            <td>{courses.instructor}</td>
                                            <td>{courses.section_name}</td>
                                            <td>
                                                <button onClick={() => handleDropClick(courses.section, courses.student)} className="btn btn-danger btn-sm">Drop</button>
                                            </td>
                                        </tr>
                                    )}
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCourse;