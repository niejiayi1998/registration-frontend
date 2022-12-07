import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const AdminRegister = () => {
    const [adminData, setAdminData] = useState({
        full_name: "",
        email: "",
        password: "",
        status: "",
    });

    useEffect(() => {
        document.title='Admin Register';
    }, []);

    const handleChange = (e) => {
        setAdminData( {
            ...adminData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        const adminFormData = new FormData();
        adminFormData.append("full_name", adminData.full_name);
        adminFormData.append("email", adminData.email);
        adminFormData.append("password", adminData.password);

        try {
            axios.post(`${baseUrl}/admin/`, adminFormData)
                .then((response) => {
                setAdminData({
                    full_name: "",
                    email: "",
                    password: "",
                    status: "success"
                })
            });
        } catch (e) {
            console.log(e)
            setAdminData({status: "error"})
        }
    }


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {adminData.status === "success" && <p className="text-success">Thanks for your registration</p>}
                    {adminData.status === 'error' && <p className="text-danger">Something wrong happened!!</p>}
                    <div className="card">
                        <h5 className="card-header">Admin Register</h5>
                        <div className="card-body">

                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">Full Name</label>
                                <input value={adminData.full_name} type="text" onChange={handleChange} name="full_name" className="form-control" id="fullname"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={adminData.email} type="email" onChange={handleChange} name="email" className="form-control" id="email"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input value={adminData.password} type="password" onChange={handleChange} name="password" className="form-control" id="password" />
                            </div>


                            <button onClick={submitForm} className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister;