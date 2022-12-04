import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const AddSection = () => {
    const [sectionData, setSectionData] = useState({
        course: "",
        name: "",
        instructor: "",
        classSize: "",
        location: "",
        term: "",
    })

    const [courseData, setCourseData] = useState([]);
    const [term, setTerm] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/course/`)
                .then((res) => {
                    setCourseData(res.data);
                })
        } catch (e) {
            console.log(e);
        }
        try {
            axios.get(`${baseUrl}/term`)
                .then((res) => {
                    setTerm(res.data);
                })
        } catch (e) {
            console.log(e);
        }
    }, [])

    const handleChange = (e) => {
        setSectionData({
            ...sectionData,
            [e.target.name]: e.target.value
        })
    }


    const formSubmit = () => {
        const formData = new FormData();
        formData.append("course", sectionData.course);
        formData.append("name", sectionData.name);
        formData.append("instructor", sectionData.instructor);
        formData.append("classSize", sectionData.classSize);
        formData.append("location", sectionData.location);
        formData.append("term", sectionData.term);

        try {
            axios.post(baseUrl + "/section/", formData)
                .then((res) => {
                    // console.log(res.data);
                    window.location.href = '/add-section'
                })
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/*<aside className="col-md-3">*/}
                {/*    <AdminSidebar />*/}
                {/*</aside>*/}
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Section</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="course" className="form-label">Course</label>
                                <select onChange={handleChange} name="course" className="form-control" id="course">
                                    <option key="0">Please select from the following courses</option>
                                    {courseData.map((c, index) => <option key={index} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input onChange={handleChange} name="name" type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instructor" className="form-label">Instructor</label>
                                <input onChange={handleChange} type="text" name="instructor" className="form-control" id="instructor" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classSize" className="form-label">Class Size</label>
                                <input onChange={handleChange} type="number" name="classSize" className="form-control" id="classSize" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classSize" className="form-label">Location</label>
                                <input onChange={handleChange} type="text" name="location" className="form-control" id="location"></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="term" className="form-label">Term</label>
                                <select onChange={handleChange} name="term" className="form-control" id="term">
                                    <option key="0">Please select from the following terms</option>
                                    {term.map((t, index) => <option key={index} value={t.id}>{t.title}</option>)}
                                </select>
                            </div>


                            <button onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddSection;