import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const AdminLogin = () => {
    useEffect(() => {
        document.title='Admin Login';
    });

    const [adminLoginData, setAdminLoginData] = useState({
        email: "",
        password: "",
    })

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setAdminLoginData({
            ...adminLoginData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        const adminFormData = new FormData();
        adminFormData.append("email", adminLoginData.email);
        adminFormData.append("password", adminLoginData.password);
        try {
            axios.post(baseUrl + "/admin-login", adminFormData)
                .then((res) => {
                    if (res.data.bool) {
                        localStorage.setItem("adminLoginStatus", true);
                        localStorage.setItem("adminId", res.data.admin_id)
                        window.location.href = "/dashboard"
                    } else {
                        setErrorMsg('Invalid Email Or Password!')
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const advisorLoginStatus = localStorage.getItem("adminLoginStatus");
    if (advisorLoginStatus) {
        window.location.href = "/dashboard"
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Admin Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={adminLoginData.email} onChange={handleChange} name="email" type="text" className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={adminLoginData.password} onChange={handleChange} name="password" type="password" className="form-control" id="password" />
                            </div>
                            <button onClick={submitForm} className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin;