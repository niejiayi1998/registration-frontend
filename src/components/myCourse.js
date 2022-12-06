import {Link, useParams} from "react-router-dom";
import {useState} from "react";

const MyCourse = () => {

    //waiting for backend api determine student enrolled courses
    const [studentData, setStudentData] = useState([]);
    const {student_id} = useParams();

    return(
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-7'>
                <h1>My Courses</h1>
                <div className="card">
                    <div className="card-header">All Courses</div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Instructor</th>
                            <th>Section</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {/*<tbody>*/}
                        {/*{studentData.filter((courses) => courses.term === currentTerm ).map((courses, index)=> {*/}
                        {/*    return (*/}
                        {/*        <tr>*/}
                        {/*            <td>{courses.name}</td>*/}
                        {/*            <td>{courses.instructor}</td>*/}
                        {/*            <td>{courses.section}</td>*/}
                        {/*            <td>*/}
                        {/*                <button onClick={() => handleDeleteClick(section.id)} className="btn btn-danger btn-sm">Drop</button>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*    )}*/}
                        {/*)}*/}
                        {/*</tbody>*/}
                    </table>
                    <div className="card-body">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCourse;