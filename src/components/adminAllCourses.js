import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import AdminSidebar from "./admin/adminSidebar";
import Swal from "sweetalert2";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const AdminAllCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/course`)
                .then((res) => {
                    setCourses(res.data)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    const handleDeleteBtn = (courseId) => {
        Swal.fire({
            title:'Confirm',
            text: 'Do yu want to Delete this?',
            icon:'info',
            confirmButtonText:'Continue',
            showCancelButton: true,
        }).then((result)=>{
            if(result.isConfirmed){
                try {
                    axios.delete(`${baseUrl}/course/${courseId}`)
                        .then((res) => {
                            window.location.reload();
                        });
                    Swal.fire('Success', 'Data has been deleted.');
                } catch (error) {
                    Swal.fire('error', 'Data has not been deleted. ');

                }
            } else {
                Swal.fire('error', 'Data has not been deleted. ');
            }
        })
    }


    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <AdminSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Courses</h5>
                        <div className="card-body">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>Course Title</th>
                                        <th>Course Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {courses.map((c, index)=> {
                                    return (
                                        <tr key={index}>
                                            <td>{c.title}</td>
                                            <td>{c.name}</td>
                                            <td>
                                                <Link to={`/edit-course/${c.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                                                <button onClick={() => handleDeleteBtn(c.id)} className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdminAllCourses;