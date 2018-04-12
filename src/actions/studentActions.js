import axios from 'axios';
import * as types from './actionTypesStudent';

export function addStudent(student){
    return { type: types.ADD_STUDENT,student};
}
export function editStudent(student) {
    return { type: types.EDIT_STUDENT, student};
}

export function deleteStudent(id) {
    return { type: types.DELETE_STUDENT, id};
}

export function setStudents(students) {
    return { type: types.SET_STUDENTS, students};
}

export function ajaxLoading(status) {
    return { type: types.AJAX_LOADING, status};
}

export function getStudents(){
    return dispatch=>{
        dispatch(ajaxLoading(true));
        axios.get('http://www.mocky.io/v2/59b994573a0000f501f7fb05')
        .then(response=>{
            dispatch(setStudents(response.data));
            dispatch(ajaxLoading(false));
        })
        .catch(error=>{
                dispatch(ajaxLoading(false));
        });
    }
}