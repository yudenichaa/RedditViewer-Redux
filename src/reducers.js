import { combineReducers } from "redux";

import { actionTypes } from "./actions";

const selectedSubreddit = (state = "reactjs", action) => {
    switch (action.type) {
        case actionTypes.SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

const posts = (
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) => {
    switch (action.type) {
        case actionTypes.INVALIDATE_SUBREDDIT:
            return {
                ...state,
                didInvalidate: true
            };
        case actionTypes.REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case actionTypes.RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    };
}

const postsBySubreddit = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.INVALIDATE_SUBREDDIT:
        case actionTypes.REQUEST_POSTS:
        case actionTypes.RECEIVE_POSTS:
            return {
                ...state,
                [action.subreddit]: posts(state[action.subreddit], action)
            };
        default:
            return state;
    }
};

export default combineReducers({
    postsBySubreddit,
    selectedSubreddit
});