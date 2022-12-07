import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const baseUrl = 'https://db-group2.wl.r.appspot.com/api'

const currentTerm = 1;

const AdvisorCourseSections = () => {
    const [sectionData, setSectionData] = useState([]);
    const [totalResult, setTotalResult] = useState(1);
    const {course_id} = useParams();

    useEffect(()=>{
        try{
            axios.get(`${baseUrl}/course-sections/${course_id}/${currentTerm}`)
                .then((res)=> {
                    setSectionData(res.data);
                    setTotalResult(res.data.length);
                });
        }catch (error){
            console.log(error);
        }
    }, []);

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
                            <th>Class Size</th>
                            <th>Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sectionData.map((section, index)=> {
                            return (
                                <tr key={index}>
                                    <td>{section.name}</td>
                                    <td>{section.instructor}</td>
                                    <td>{section.classSize}</td>
                                    <td>{section.location}</td>
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

export default AdvisorCourseSections;