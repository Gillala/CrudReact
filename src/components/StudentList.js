import React from 'react';
import { NavLink } from 'react-router-dom'
import StudentPagination from './StudentPagination';
const StudentList = ({ students, onDeleteStudent, pages, currentPage }) => {
    return (
        !students.length ?
            <p className="alert alert-warning text-center"> No students found.</p> :
            <div className="merchant-list">
                <div className="responsive-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Firstname</th>
                                <th>LastName</th>
                                <th>Image</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Premium</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student =>
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.firstname}</td>
                                    <td>{student.lastname}</td>
                                    <td><img className="avatar" src={student.avatarUrl} alt=""></img></td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td className="premium">

                                        {
                                            student.hasPremium ?
                                                <span className="glyphicon glyphicon-ok"></span>
                                                :
                                                <span className="glyphicon glyphicon-remove"></span>

                                        }
                                    </td>
                                    <td>
                                        <NavLink className="btn btn-primary btn-sm" to={'/editStudents/' + student.id}>Edit</NavLink>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={() => onDeleteStudent(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>
                {
                    pages > 1 && <StudentPagination pages={pages} currentPage={currentPage} />
                }
            </div>
    )
};
export default StudentList;