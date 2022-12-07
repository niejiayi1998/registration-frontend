import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./admin/adminSidebar";
const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const EditCourse = () => {
    const [departments, setDepartments] = useState([]);
    const [courseData, setCourseData] = useState({
        department: "",
        name: "",
        description: "",
        credit: "",
    })

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name] : e.target.value
        });
    }

    const {course_id} = useParams();

    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('department', courseData.department);
        _formData.append('name', courseData.name);
        _formData.append('description', courseData.description);
        _formData.append('credit', courseData.credit);

        try{
            axios.put(`${baseUrl}/course/${course_id}/`, _formData)
                .then((res)=> {
                    console.log(res)
                    window.location.href=`/course/${course_id}`;
                });
        }catch (error){
            console.log(error);
        }
    };

    useEffect(()=>{
        try{
            axios.get(baseUrl + '/course/' + course_id)
                .then((res)=> {
                    setCourseData(res.data);
                });
        }catch (error){
            console.log(error);
        }

        try {
            axios.get(`${baseUrl}/department`)
                .then((res) => {
                    setDepartments(res.data);
                })
        } catch (e) {
            console.log(e);
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
                        <h5 className="card-header">Update Course</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="department" className="form-label">Department</label>
                                <select onChange={handleChange} value={courseData.department} name="department" className="form-control" id="department">
                                    {departments.map((d, index) => <option key={index} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input onChange={handleChange} value={courseData.name} name="name" type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} value={courseData.description} name="description" className="form-control" id="description" rows="5"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="credit" className="form-label">Credit</label>
                                <input onChange={handleChange} value={courseData.credit} type="number" name="credit" className="form-control" id="credit"></input>
                            </div>

                            <button onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )

}

export default EditCourse;