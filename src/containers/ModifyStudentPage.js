import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as studentActions from '../actions/studentActions';
// Child components
import StudentForm from '../components/StudentForm';

class ModifyStudentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formStatus: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // Check if form has any errors
        if (!this.props.studentForm.syncErrors) {
            // Add current student ID and bids to form fields
            let student = Object.assign({}, this.props.studentForm.values, {
                id: this.props.currentStudent.id,
            });
            this.props.actions.editStudent(student);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            this.props.ajaxLoading ?
                <p className="text-center alert alert-info">Loading student...</p>
                :
                !this.props.currentStudent ?
                    <p className="text-center alert alert-danger">Student not found.</p>
                    :
                    <div className="add-student">
                        <h1 className="text-center text-capitalize">Edit student information</h1>
                        <StudentForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus}
                                      initialValues={this.props.currentStudent} goBack={this.props.goBack} />
                    </div>
        )
    }
}

// Find current student based on ID passed in URL
function findCurrentStudent(students, id = -1) {
    // Find student for given id
    return students.find(student => {
        return parseInt(student.id, 10) === parseInt(id, 10);
    });
}

function mapStateToProps(state, ownProps) {
    let currentStudent = state.students.length ? findCurrentStudent(state.students, ownProps.match.params.id) : null;
    return {
        currentStudent,
        studentForm: state.form.student,
        ajaxLoading: state.ajaxLoading,
        goBack: ownProps.history.goBack
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyStudentPage);