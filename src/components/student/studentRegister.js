import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const StudentRegister = () => {
    const [studentData, setStudentData] = useState({
        full_name: "",
        email: "",
        password: "",
        GPA: "",
        status: "",
    });

    useEffect(() => {
        document.title='Student Register';
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

        try {
            axios.post(`${baseUrl}/student/`, studentFormData)
                .then((response) => {
                setStudentData({
                    full_name: "",
                    email: "",
                    password: "",
                    GPA: "",
                    status: "success"
                })
            });
        } catch (e) {
            console.log(e)
            setStudentData({status: "error"})
        }
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus) {
        window.location.href = "/dashboard"
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


                            <button onClick={submitForm} className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentRegister;