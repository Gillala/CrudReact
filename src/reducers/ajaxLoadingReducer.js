import * as types from '../actions/actionTypesStudent'
import initialState from '../store/initialState';

export default function ajaxLoadingReducer(state = initialState.ajaxLoading, action) {
    if (action.type === types.AJAX_LOADING) {
        return action.status
    }
    return state;
}