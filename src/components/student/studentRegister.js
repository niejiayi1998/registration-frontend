import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const StudentRegister = () => {
    const [grades, setGrades] = useState([]);
    const [studentData, setStudentData] = useState({
        full_name: "",
        email: "",
        password: "",
        grade: "",
        GPA: "",
        status: "",
    });

    useEffect(() => {
        document.title='Student Register';
        try {
            axios.get(`${baseUrl}/grade`)
                .then((res) => {
                    setGrades(res.data)
                })
        } catch (e) {
            console.log(e)
        }
    }, []);

    const handleChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("password", studentData.password);
        studentFormData.append("grade", studentData.grade);
        studentFormData.append("GPA", studentData.GPA);
        try {
            console.log(studentData)
            axios.post(`${baseUrl}/student/`, studentFormData).then((response) => {
                setStudentData({
                    full_name: "",
                    email: "",
                    password: "",
                    grade: "",
                    GPA: "",
                    status: "success"
                })
            });
        } catch (e) {
            console.log(e)
            setStudentData({status: "error"})
        }
    }


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {studentData.status === "success" && <p className="text-success">Thanks for your registration</p>}
                    {studentData.status === 'error' && <p className="text-danger">Something wrong happened!!</p>}
                    <div className="card">
                        <h5 className="card-header">Student Register</h5>
                        <div className="card-body">

                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">Full Name</label>
                                <input value={studentData.full_name} type="text" onChange={handleChange} name="full_name" className="form-control" id="fullname"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={studentData.email} type="email" onChange={handleChange} name="email" className="form-control" id="email"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={studentData.password} type="password" onChange={handleChange} name="password" className="form-control" id="password" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="grade" className="form-label">Grade</label>
                                <select onChange={handleChange} name="grade" className="form-control" id="grade">
                                    <option key="0">------- Please Select -------</option>
                                    {grades.map((g, index) => <option key={index} value={g.id}>{g.title}</option>)}
                                </select>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="GPA" className="form-label">GPA</label>
                                <input value={studentData.GPA} type="number" step="0.01" min="0" max="4" onChange={handleChange} name="GPA" className="form-control" id="GPA" />
                            </div>

                            <button onClick={submitForm} className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentRegister;