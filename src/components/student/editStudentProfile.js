import {useState, useEffect} from "react";
import axios from "axios";
import StudentSidebar from "./studentSideBar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api';

const EditStudentProfile = () => {
    const [studentData, setStudentData] = useState({
        full_name: '',
        email: '',
        password: '',
        GPA:'',
    });
    const studentId = localStorage.getItem('studentId');

    const handleChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name] : e.target.value
        });
    }

    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('full_name', studentData.full_name);
        _formData.append('email', studentData.email);
        _formData.append('password', studentData.password);
        _formData.append('GPA', studentData.GPA);

        try{
            axios.put(`${baseUrl}/student/${studentId}/`, _formData)
                .then((res)=> {
                    console.log(res)
                    alert('Password has been successfully updated!')
                    // window.location.href='/add-chapter/1';
                });
        }catch (error){
            console.log(error);
        }
    };

    useEffect(()=>{
        try{
            axios.get(`${baseUrl}/student/${studentId}/`)
                .then((res)=> {
                    setStudentData(res.data);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <StudentSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" name="full_name" value={studentData.full_name} className="form-control" id="inputName" readOnly/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" name="email" value={studentData.email} className="form-control" id="staticEmail" readOnly/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Change Password</label>
                                <div className="col-sm-10">
                                    <input type="password" name="password" onChange={handleChange} value={studentData.password} className="form-control" id="password"/>
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

export default EditStudentProfile;