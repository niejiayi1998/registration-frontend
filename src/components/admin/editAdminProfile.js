import {useState, useEffect} from "react";
import axios from "axios";
import AdminSidebar from "./adminSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api';

const EditAdminProfile = () => {
    const [adminData, setAdminData] = useState({
        full_name: '',
        email: '',
        password: '',
    });
    const adminId = localStorage.getItem('adminId');

    const handleChange = (e) => {
        setAdminData({
            ...adminData,
            [e.target.name] : e.target.value
        });
    }

    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('full_name', adminData.full_name);
        _formData.append('email', adminData.email);
        _formData.append('password', adminData.password);

        try{
            axios.put(`${baseUrl}/admin/${adminId}/`, _formData)
                .then((res)=> {
                    alert('Password has been successfully updated!')
                });
        }catch (error){
            console.log(error);
        }
    };

    useEffect(()=>{
        try{
            axios.get(`${baseUrl}/admin/${adminId}/`)
                .then((res)=> {
                    setAdminData(res.data);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" name="full_name" value={adminData.full_name} className="form-control" id="inputName" readOnly/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" name="email" value={adminData.email} className="form-control" id="staticEmail" readOnly/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Change Password</label>
                                <div className="col-sm-10">
                                    <input type="password" name="password" onChange={handleChange} value={adminData.password} className="form-control" id="password"/>
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

export default EditAdminProfile;