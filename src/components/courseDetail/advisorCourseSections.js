import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = 'https://db-group2.wl.r.appspot.com/api'
const currentTerm = 1;

function AdvisorCourseSections(){
    const [sectionData, setSectionData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const {course_id} = useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl + '/course-sections/' + course_id)
                .then((res)=> {
                    settotalResult(res.data.length);
                    setSectionData(res.data);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

    const Swal = require('sweetalert2');
    const handleDeleteClick = (section_id) => {
        Swal.fire({
            title:'Confirm',
            text: 'Do yu want to Delete this?',
            icon:'info',
            confirmButtonText:'Continue',
            showCancelButton: true,
        }).then((result)=>{
            if(result.isConfirmed){
                try {
                    axios.delete(baseUrl + '/section/' + section_id)
                        .then((res) => {
                            window.location.reload();
                            // console.log(res);
                            // settotalResult(res.data.length);
                            // setchapterData(res.data);
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
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <div className="card-header">All Sections ({totalResult})</div>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Section Name</th>
                                <th>Instructor</th>
                                <th>Class Size</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sectionData.filter((section) => section.term === currentTerm ).map((section, index)=> {
                                return (
                                    <tr>
                                        <td>{section.name}</td>
                                        <td>{section.instructor}</td>
                                        <td>{section.classSize}</td>
                                        <td>{section.location}</td>
                                        <td>
                                            <Link to={'/edit-section/' + section.id} className="btn btn-info btn-sm ms-1">Edit</Link>
                                            <button onClick={() => handleDeleteClick(section.id)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                )}
                            )}
                            </tbody>
                        </table>
                        <div className="card-body">
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdvisorCourseSections;