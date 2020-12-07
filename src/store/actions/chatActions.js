import {
    GET_MESSAGES_SUCCESS,
    GET_USERS_SUCCESS,
    POST_MESSAGES_SUCCESS
} from "../actionTypes";

export const getMessages = value => {
    return {type: GET_MESSAGES_SUCCESS, value};
};

export const getUsers = value => {
    return {type: GET_USERS_SUCCESS, value};
};

export const postMessage = value => {
    return {type: POST_MESSAGES_SUCCESS, value};
}