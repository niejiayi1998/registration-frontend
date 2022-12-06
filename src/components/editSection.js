import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./admin/adminSidebar";
const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const EditSection = () => {

    const [sectionData, setSectionData] = useState({
        course: "",
        name: "",
        instructor: "",
        classSize: "",
        location: "",
        term: "",
        course_name: "",
        term_name: "",
    })

    const handleChange = (e) => {
        setSectionData({
            ...sectionData,
            [e.target.name] : e.target.value
        });
    }

    const {section_id} = useParams();

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/section/${section_id}`)
                .then((res) => {
                    setSectionData(res.data);
                })
        } catch (e) {
            console.log(e);
        }

    },[])

    const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('course', sectionData.course);
        _formData.append('name', sectionData.name);
        _formData.append('instructor', sectionData.instructor);
        _formData.append('classSize', sectionData.classSize);
        _formData.append('location', sectionData.location);
        _formData.append('term', sectionData.term);
        _formData.append('course_name', sectionData.course_name);
        _formData.append('term_name', sectionData.term_name);

        try{
            axios.put(`${baseUrl}/section/${section_id}/`, _formData)
                .then((res)=> {
                    console.log(res)
                    // window.location.href='/add-chapter/1';
                });
        }catch (error){
            console.log(error);
        }
    };
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Update Section</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="course_name" className="form-label">Course</label>
                                <input value={sectionData.course_name} name="course_name" type="text" className="form-control" id="course_name" readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input onChange={handleChange} value={sectionData.name} name="name" type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instructor" className="form-label">Instructor</label>
                                <input onChange={handleChange} value={sectionData.instructor} name="instructor" type="text" className="form-control" id="instructor" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classSize" className="form-label">Class Size</label>
                                <input onChange={handleChange} value={sectionData.classSize} type="number" name="classSize" className="form-control" id="classSize"></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classSize" className="form-label">Location</label>
                                <input onChange={handleChange} value={sectionData.location} type="text" name="location" className="form-control" id="location"></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="term_name" className="form-label">Term</label>
                                <input value={sectionData.term_name} name="term_name" type="text"
                                       className="form-control" id="term_name" readOnly/>
                            </div>
                            <button onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default EditSection;