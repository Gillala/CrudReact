import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as studentActions from '../actions/studentActions';
import StudentList from '../components/StudentList';

class StudentsPage extends React.Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent(id) {
        if (window.confirm("Are you sure, you want to delete this student?")) {
            this.props.actions.deleteStudent(id);
        }
    }

    render() {
        return (
            <div className="students">
                {
                    this.props.ajaxLoading ?
                        <p className="text-center alert alert-info">Loading Students..</p> :
                        <StudentList students={this.props.students} pages={this.props.pages} onDeleteStudent={this.deleteStudent} currentPage={this.props.currentPage} />
                }
            </div>
        )
    }
};

function generateStudentsByPage(students, pageNo) {
    const pageSize = 10;
    if (students.length) {
        return students.filter((student, index) => {
            return index >= pageSize * (pageNo - 1) && index < pageSize * pageNo
        });
    }
}

function mapStateToProps(state, ownProps) {
    let pageNo = ownProps.match.params.pageNo || 1;
    let students = generateStudentsByPage(state.students, pageNo);
    return {
        students: students,
        pages: Math.ceil(state.students.length / 10),
        currentPage: pageNo,
        ajaxLoading: state.ajaxLoading
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);