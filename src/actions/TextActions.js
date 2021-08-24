import {
    GET_TEXT_ERROR,
    GET_TEXT_REQUEST,
    GET_TEXT_SUCCESS,
} from "../constants";

export const getText = (search) => async (dispatch, getState) => {
    dispatch({
        type: GET_TEXT_REQUEST,
        payload: {
            loading: true,
        },
    });

    fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
            dispatch({
                type: GET_TEXT_SUCCESS,
                payload: {
                    loading: false,
                    text: data.content,
                    error: null,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_TEXT_ERROR,
                payload: {
                    loading: false,
                    error: err,
                },
            });
        });
};
