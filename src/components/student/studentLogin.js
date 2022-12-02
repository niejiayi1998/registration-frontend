import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const StudentLogin = () => {
    useEffect(() => {
        document.title='Student Login';
    });

    const [studentLoginData, setStudentLoginData] = useState({
        email: "",
        password: "",
    })

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setStudentLoginData({
            ...studentLoginData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        const studentFormData = new FormData();
        studentFormData.append("email", studentLoginData.email);
        studentFormData.append("password", studentLoginData.password);
        try {
            axios.post(baseUrl + "/student-login", studentFormData)
                .then((res) => {
                    if (res.data.bool) {
                        localStorage.setItem("studentLoginStatus", true);
                        localStorage.setItem("studentId", res.data.student_id)
                        window.location.href = "/dashboard"
                    } else {
                        setErrorMsg('Invalid Email Or Password!')
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus) {
        window.location.href = "/student-dashboard"
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Student Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={studentLoginData.email} onChange={handleChange} name="email" type="text" className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={studentLoginData.password} onChange={handleChange} name="password" type="password" className="form-control" id="password" />
                            </div>
                            <button onClick={submitForm} className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentLogin;