import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const AdvisorRegister = () => {
    const [departments, setDepartments] = useState([]);
    const [advisorData, setAdvisorData] = useState({
        full_name: "",
        department: "",
        email: "",
        password: "",
        status: "",
    });

    useEffect(() => {
        document.title='Advisor Register';

        try {
            axios.get(`${baseUrl}/department`)
                .then((res) => {
                    setDepartments(res.data);
                })
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleChange = (e) => {
        setAdvisorData( {
            ...advisorData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        const advisorFormData = new FormData();
        advisorFormData.append("full_name", advisorData.full_name);
        advisorFormData.append("department", advisorData.department);
        advisorFormData.append("email", advisorData.email);
        advisorFormData.append("password", advisorData.password);

        try {
            axios.post(`${baseUrl}/advisor/`, advisorFormData)
                .then((response) => {
                setAdvisorData({
                    full_name: "",
                    email: "",
                    department: "",
                    password: "",
                    status: "success"
                })
            });
        } catch (e) {
            console.log(e)
            setAdvisorData({status: "error"})
        }
    }


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {advisorData.status === "success" && <p className="text-success">Thanks for your registration</p>}
                    {advisorData.status === 'error' && <p className="text-danger">Something wrong happened!!</p>}
                    <div className="card">
                        <h5 className="card-header">Advisor Register</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="department" className="form-label">Department</label>
                                <select onChange={handleChange} name="department" className="form-control" id="department">
                                    <option key="0">Please select from the following department</option>
                                    {departments.map((d, index) => <option key={index} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">Full Name</label>
                                <input value={advisorData.full_name} type="text" onChange={handleChange} name="full_name" className="form-control" id="fullname"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={advisorData.email} type="email" onChange={handleChange} name="email" className="form-control" id="email"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={advisorData.password} type="password" onChange={handleChange} name="password" className="form-control" id="password" />
                            </div>


                            <button onClick={submitForm} className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvisorRegister;