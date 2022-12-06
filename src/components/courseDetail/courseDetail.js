import AdminCourseSections from "./adminCourseSections";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

// const baseUrl = 'https://db-group2.wl.r.appspot.com/api'
const baseUrl = 'http://127.0.0.1:8000/api'

const CourseDetail = () => {
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    const adminLoginStatus = localStorage.getItem('adminLoginStatus');
    const [courseData, setCourseData] = useState({
        department: "",
        name: "",
        description: "",
        credit: "",
    });
    const {course_id} = useParams();

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/course/${course_id}`)
                .then((res) => {
                    setCourseData(res.data)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className='row my-3'>
            <div className='col-8 offset-2'>
                <h2 className='mb-3'>{courseData.title} {courseData.name}</h2>
                <div className='fw-bold mb-2'>Credits: <span className="fw-normal">{courseData.credit}</span></div>
                <div className='fw-bold mb-2'>Course Description : <span className='fw-normal'>{courseData.description}</span> </div>
                <div className='fw-bold mb-2'>Department : <span className='fw-normal'>{courseData.department_name}</span></div>
                {adminLoginStatus && <AdminCourseSections />}
            </div>
        </div>
    )
}

export default CourseDetail;