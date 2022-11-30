import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const AdvisorLogin = () => {
    useEffect(() => {
        document.title='Advisor Login';
    });

    const [advisorLoginData, setAdvisorLoginData] = useState({
        email: "",
        password: "",
    })

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setAdvisorLoginData({
            ...advisorLoginData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        const advisorFormData = new FormData();
        advisorFormData.append("email", advisorLoginData.email);
        advisorFormData.append("password", advisorLoginData.password);
        try {
            axios.post(baseUrl + "/advisor-login", advisorFormData)
                .then((res) => {
                    if (res.data.bool) {
                        localStorage.setItem("advisorLoginStatus", true);
                        localStorage.setItem("advisorId", res.data.advisor_id)
                        window.location.href = "/advisor-dashboard"
                    } else {
                        setErrorMsg('Invalid Email Or Password!')
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const advisorLoginStatus = localStorage.getItem("advisorLoginStatus");
    if (advisorLoginStatus) {
        window.location.href = "/advisor-dashboard"
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Advisor Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={advisorLoginData.email} onChange={handleChange} name="email" type="text" className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={advisorLoginData.password} onChange={handleChange} name="password" type="password" className="form-control" id="password" />
                            </div>
                            <button onClick={submitForm} className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvisorLogin;