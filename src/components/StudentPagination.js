import React from 'react'
import { NavLink } from 'react-router-dom';
const StudentPagination = ({currentPage, pages}) => {
    let prevLink = parseInt(currentPage, 10) - 1;
    let nextLink = parseInt(currentPage, 10) + 1;
    return (
        <div className="text-center">
            <nav>
                <ul className="pager">
                    <li>
                        {prevLink > 0 ?
                            <NavLink to={'/students/' + prevLink} >Previous</NavLink> :
                            <span>Previous</span>}
                    </li>
                    <li>
                        {nextLink <= pages ?
                            <NavLink to={'/students/' + nextLink}>Next</NavLink> :
                            <span>Next</span>
                        }
                    </li>
                </ul>
            </nav>

        </div>
    )
}
export default StudentPagination;