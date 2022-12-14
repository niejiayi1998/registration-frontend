import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'
const currentTerm = 1;

function AdminCourseSections(){
    const [sectionData, setSectionData] = useState([]);
    const [totalResult, settotalResult] = useState(1);
    const {course_id} = useParams();

    useEffect(()=>{
        try{
            axios.get(`${baseUrl}/course-sections/${course_id}/${currentTerm}`)
                .then((res)=> {
                    settotalResult(res.data.length);
                    setSectionData(res.data);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

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
            <div className="card">
                <h5 className="card-header">All Sections</h5>
                {totalResult > 0 ?
                <div className="card-body">
                    <table className="table text-center">
                        <thead>
                        <tr>
                            <th>Section Name</th>
                            <th>Instructor</th>
                            <th>Current Enroll / Class Size</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sectionData.map((section, index)=> {
                            return (
                                <tr key={index}>
                                    <td>{section.name}</td>
                                    <td>{section.instructor}</td>
                                    <td>{section.total_enrolled_students} / {section.classSize}</td>
                                    <td>{section.location}</td>
                                    <td>
                                        <Link to={'/edit-section/' + section.id} className="btn btn-info btn-sm me-2 text-white">Edit</Link>
                                        <button onClick={() => handleDeleteClick(section.id)} className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                </div> :
                    <h4 className="text-center">Sorry, no section offer in Spring 2023</h4>
                }
            </div>
        </div>
    )
}

export default AdminCourseSections;