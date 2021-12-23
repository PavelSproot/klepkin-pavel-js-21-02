module.exports = {
    usersService: {
        GET_USER_BY_ID_PARAMS: "[usersService.getUserById] id={}",
        GET_USER_BY_ID_SUCCESS: "[usersService.getUserById] success status={} result={}",
        GET_USER_BY_ID_ERROR: "[usersService.getUserById] error status={} response={}",

        GET_USER_LIST_PARAMS: "[usersService.getUserList] page={}, limit={}",
        GET_USER_LIST_SUCCESS: "[usersService.getUserList] success status={} result={}",
        GET_USER_LIST_ERROR: "[usersService.getUserList] error status={} response={}",

        GET_USER_POST_LIST_PARAMS:
            "[usersService.getUserPostList] userid={}, page={}, limit={}",
        GET_USER_POST_LIST_SUCCESS: "[usersService.getUserPostList] success status={} result={}",
        GET_USER_POST_LIST_ERROR: "[usersService.getUserPostList] error status={} response={}",

        CREATE_USER_PARAMS: "[usersService.createUser] user={}",
        CREATE_USER_SUCCESS: "[usersService.createUser] success status={} result={}",
        CREATE_USER_ERROR: "[usersService.createUser] error status={} response={}",

        UPDATE_USER_PARAMS: "[usersService.updateUser] userid={}, user={}",
        UPDATE_USER_SUCCESS: "[usersService.updateUser] success status={} result={}",
        UPDATE_USER_ERROR: "[usersService.updateUser] error status={} response={}",
    },

    postsService: {
        GET_POST_BY_ID_PARAMS: "[postsService.getPostById] id={}",
        GET_POST_BY_ID_SUCCESS: "[postsService.getPostById] success status={} result={}",
        GET_POST_BY_ID_ERROR: "[postsService.getPostById] error status={} response={}",

        GET_POST_LIST_PARAMS: "[postsService.getPostList] page={}, limit={}",
        GET_POST_LIST_SUCCESS: "[postsService.getPostList] success status={} result={}",
        GET_POST_LIST_ERROR: "[postsService.getPostList] error status={} response={}",

        GET_POST_COMMENTS_PARAMS:
            "[postsService.getPostCommentList] postid={}, page={}, limit={}",
        GET_POST_COMMENTS_SUCCESS: "[postsService.getPostCommentList] success status={} result={}",
        GET_POST_COMMENTS_ERROR:
            "[postsService.getPostCommentList] error status={} response={}",
    },
};
