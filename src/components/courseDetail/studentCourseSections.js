import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'
const currentTerm = 1;

function StudentCourseSections(){
    const [sectionData, setSectionData] = useState([]);
    const [totalResult, settotalResult] = useState(1);
    const [enrollStatus, setEnrollStatus] = useState(false);
    const {course_id} = useParams();
    const studentId = localStorage.getItem("studentId");

    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}`)
                .then(res => setEnrollStatus(res.data.bool));
        } catch (e) {
            console.log(e);
        }

        try{
            axios.get(`${baseUrl}/course-sections/${course_id}/${currentTerm}`)
                .then((res)=> {
                    settotalResult(res.data.length);
                    setSectionData(res.data);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

    const handleEnrollBtn = (sectionId) => {
        let ticketExist = false;
        try {
            axios.get(`${baseUrl}/enroll-ticket/${studentId}/${sectionId}`)
                .then((res) => {
                    ticketExist = res.data.bool;
                    if (!ticketExist) {
                        const ticketFormData = new FormData();
                        ticketFormData.append("student", studentId);
                        ticketFormData.append("section", sectionId);
                        ticketFormData.append("request", "ENROLL");
                        ticketFormData.append("status", 2);

                        try {
                            axios.post(`${baseUrl}/ticket/`, ticketFormData)
                                .then((res) => {})
                        } catch (e) {
                            console.log(e)
                        }
                    } else {
                        alert("You have already submitted the enroll request, please wait for advisor's approval!")
                    }
                })
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">All Sections</div>
                {totalResult > 0 ?
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Section Name</th>
                            <th>Instructor</th>
                            <th>Class Size</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sectionData.map((section, index)=> {
                            return (
                                <tr key={index}>
                                    <td>{section.name}</td>
                                    <td>{section.instructor}</td>
                                    <td>{section.classSize}</td>
                                    <td>{section.location}</td>
                                    <td>
                                        {enrollStatus ?
                                            "You have already enrolled in this course!" :
                                            <button onClick={() => handleEnrollBtn(section.id)}
                                                    className="btn btn-sm btn-success">Enroll</button>
                                        }
                                    </td>
                                </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                </div> :
                    <h4 className="text-center">Sorry, no section offer in Spring 2023</h4>
                }
            </div>
        </div>
    )
}

export default StudentCourseSections;