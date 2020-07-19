
export const actionTypes = {
    REQUEST_POSTS: "REQUEST_POSTS",
    RECEIVE_POSTS: "RECEIVE_POSTS",
    SELECT_SUBREDDIT: "SELECT_SUBREDDIT",
    INVALIDATE_SUBREDDIT: "INVALIDATE_SUBREDDIT"
};

export const selectSubreddit = subreddit => ({
    type: actionTypes.SELECT_SUBREDDIT,
    subreddit
});

export const invalidateSubreddit = subreddit => ({
    type: actionTypes.INVALIDATE_SUBREDDIT,
    subreddit
});

const requestPosts = subreddit => ({
    type: actionTypes.REQUEST_POSTS,
    subreddit
});

const receivePosts = (subreddit, json) => ({
    type: actionTypes.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
});

const fetchPosts = subreddit => {
    return async dispatch => {
        dispatch(requestPosts(subreddit));
        const json = await (await fetch(`https://www.reddit.com/r/${subreddit}.json`)).json()
        dispatch(receivePosts(subreddit, json));
    }
};

const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit];
    if (!posts) return true;
    else if (posts.isFetching) return false;
    else return posts.didInvalidate;
};

export const fetchPostsIfNeeded = subreddit => {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            dispatch(fetchPosts(subreddit));
        }
    }
};