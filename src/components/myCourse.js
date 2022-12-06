
import {useEffect, useState} from "react";
import axios from "axios";
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
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-7'>
                <h1>My Courses</h1>
                <div className="card">
                    <div className="card-header">All Courses</div>
                    <table className="table table-bordered">
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
                                <tr>
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
                    <div className="card-body">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCourse;