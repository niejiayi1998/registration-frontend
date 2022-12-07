import {useEffect, useState} from "react";
import axios from "axios";
import AdminSidebar from "./admin/adminSidebar";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const AddCourse = () => {
    const [departments, setDepartments] = useState([]);
    const [courseData, setCourseData] = useState({
        department: "",
        title: "",
        name: "",
        description:"",
        credit: "",
    })

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/department`)
                .then((res) => {
                    setDepartments(res.data);
                })
        } catch (e) {
            console.log(e);
        }
    }, [])

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        })
    }


    const formSubmit = () => {
        const formData = new FormData();
        formData.append("department", courseData.department);
        formData.append("title", courseData.title);
        formData.append("name", courseData.name);
        formData.append("description", courseData.description);
        formData.append("credit", courseData.credit);

        try {
            axios.post(baseUrl + "/course/", formData)
                .then((res) => {
                    window.location.href = '/'
                })
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Courses</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="department" className="form-label">Department</label>
                                <select onChange={handleChange} name="department" className="form-control" id="department">
                                    <option key="0">Please select from the following courses</option>
                                    {departments.map((d, index) => <option key={index} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Course Title</label>
                                <input onChange={handleChange} name="title" type="text" className="form-control" id="title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input onChange={handleChange} name="name" type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Course Description</label>
                                <textarea onChange={handleChange} name="description" type="text" className="form-control" id="description" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="credit" className="form-label">Credit</label>
                                <input onChange={handleChange} type="number" name="credit" className="form-control" id="credit"></input>
                            </div>

                            <button onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddCourse;