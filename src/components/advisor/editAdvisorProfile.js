import {useState, useEffect} from "react";
import axios from "axios";
import AdvisorSidebar from "./advisorSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api';

const EditAdvisorProfile = () => {
    const [advisorData, setAdvisorData] = useState({
        full_name: '',
        email: '',
        password: '',
    });
    const advisorId = localStorage.getItem('advisorId');

    const handleChange = (e) => {
        setAdvisorData({
            ...advisorData,
            [e.target.name] : e.target.value
        });
    }

    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('full_name', advisorData.full_name);
        _formData.append('email', advisorData.email);
        _formData.append('password', advisorData.password);

        try{
            axios.put(`${baseUrl}/advisor/${advisorId}/`, _formData)
                .then((res)=> {
                    alert('Password has been successfully updated!')
                });
        }catch (error){
            console.log(error);
        }
    };

    useEffect(()=>{
        try{
            axios.get(`${baseUrl}/advisor/${advisorId}/`)
                .then((res)=> {
                    setAdvisorData(res.data);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdvisorSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" name="full_name" value={advisorData.full_name} className="form-control" id="inputName" readOnly/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" name="email" value={advisorData.email} className="form-control" id="staticEmail" readOnly/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Change Password</label>
                                <div className="col-sm-10">
                                    <input type="password" name="password" onChange={handleChange} value={advisorData.password} className="form-control" id="password"/>
                                </div>
                            </div>
                            <hr/>
                            <button onClick={formSubmit} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default EditAdvisorProfile;