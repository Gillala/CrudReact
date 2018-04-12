import * as types from '../actions/actionTypesStudent';
import initialState from '../store/initialState';

export default function studentsReducer(state = initialState.students, action) {
    switch (action.type) {
        case types.SET_STUDENTS:
            return action.students;
        case types.ADD_STUDENT:
            return [
                ...state,
                Object.assign({}, action.student)
            ];
        case types.EDIT_STUDENT:
            return [
                ...state.filter(student => student.id !== action.student.id),
                Object.assign({}, action.student)
            ];
        case types.DELETE_STUDENT:
            return [
                ...state.filter(student => student.id !== action.id)
            ];
        default:
            return state;
    }
}