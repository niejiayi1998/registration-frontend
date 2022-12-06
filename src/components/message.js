import {useEffect, useState} from "react";
import axios from "axios";
import AdvisorSidebar from "./advisor/advisorSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const Message = () => {
    const advisorId = localStorage.getItem("advisorId");

    const [students, setStudents] = useState([]);
    const [studentEmail, setStudentEmail] = useState("");
    const [message, setMessage] = useState({
        student: "",
        advisor: "",
        content: "",
    })

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/student`)
                .then((res) => {
                    setStudents(res.data);
                })
        } catch (e) {
            console.log(e);
        }
    }, [])

    const handleChange = (e) => {
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        })
    }

    const handleStudentChange = (e) => {
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        })

        const selectedStudentId = parseInt(e.target.value);
        const selectedStudentEmail = students.find(s => s.id === selectedStudentId)
        if (selectedStudentEmail) {
            setStudentEmail(selectedStudentEmail.email);
        }
    }

    const formSubmit = () => {
        const formData = new FormData();
        formData.append("student", message.student);
        formData.append("advisor", advisorId);
        formData.append("content", message.content);

        try {
            axios.post(baseUrl + "/message/", formData)
                .then((res) => {
                    // console.log(res.data);
                    window.location.href = '/message'
                })
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdvisorSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Message Student</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="student" className="form-label">Student Name</label>
                                <select onChange={handleStudentChange} name="student" className="form-control" id="student">
                                    <option value="">Please select student</option>
                                    {students.map((s, index) => <option key={index} value={s.id}>{s.full_name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="student_email" className="form-label">Student Email</label>
                                <input name="student_email" value={studentEmail} className="form-control" id="student_email" readOnly/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <textarea onChange={handleChange} name="content" className="form-control" id="content" rows="5"/>
                            </div>

                            <button onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Message;