import AdvisorCourseSections from "./advisorCourseSections";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
const baseUrl = 'https://db-group2.wl.r.appspot.com/api'


const CourseDetail = () => {
    const [courseData, setCourseData] = useState({
        department: "",
        name: "",
        description: "",
        credit: "",
    });
    const {course_id} = useParams();

    console.log(courseData);
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
    console.log(courseData);

    return (
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-6'>
                <div className='h1 mb-2'>{courseData.name}</div>
                <div className='row mb-2'>
                    <div className='col-2 fw-bold'>Credits: </div>
                    <div className='col-7'>{courseData.credit}</div>
                </div>
                <div className='fw-bold mb-2'>Course Description : <span className='fw-normal'>{courseData.description}</span> </div>
                <div className='fw-bold col-3'>Department : <span className='fw-normal'>{courseData.department}</span></div>
            </div>
            <AdvisorCourseSections />
        </div>
    )
}

export default CourseDetail;