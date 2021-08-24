import {
    GET_TEXT_ERROR,
    GET_TEXT_SUCCESS,
    GET_TEXT_REQUEST,
} from "../constants";

const initialState = {
    loading: false,
    text: "",
    error: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TEXT_REQUEST:
        case GET_TEXT_ERROR:
        case GET_TEXT_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}
