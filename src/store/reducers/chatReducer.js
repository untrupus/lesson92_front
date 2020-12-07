import {
    GET_MESSAGES_SUCCESS,
    GET_USERS_SUCCESS,
    POST_MESSAGES_SUCCESS
} from "../actionTypes";

const initialState = {
    messages: [],
    users: [],
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_SUCCESS:
            return {...state, messages: action.value};
        case GET_USERS_SUCCESS:
            return {...state, users: action.value};
        case POST_MESSAGES_SUCCESS:
            return {...state, messages: [...state.messages, action.value]}
        default:
            return state;
    }
};

export default chatReducer;