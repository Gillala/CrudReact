import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as studentActions from '../actions/studentActions';
import StudentForm from '../components/StudentForm';

class AddStudentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formStatus: null
        };
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        if(!this.props.studentForm.syncErrors){
            let student= Object.assign({}, this.props.studentForm.values,{
                id: this.props.newId,
                bids:[]
            });
            this.props.actions.addStudent(student);this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }
    render() {
        return (
            <div className="add-student">
                <h1 className="text-center text-capitalize">Add new student</h1>
                <StudentForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus} />
            </div>
        )
    }

}

// Generate ID for new student
function generateNewId(students) {
    // Clone students array
    let sortedStudents = students.slice(0);
    // Sort students by ID
    sortedStudents = sortedStudents.sort(function(a, b) {
        return b.id - a.id;
    });
    let lastId = sortedStudents.length ? parseInt(sortedStudents[0].id, 10) : 0;
    return lastId + 1;
}

function mapStateToProps(state) {
    let newId = generateNewId(state.students);
    return {
        studentForm: state.form.student,
        newId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentPage);