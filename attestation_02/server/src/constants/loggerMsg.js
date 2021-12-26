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

    usersRepository: {
        GET_USER_BY_ID_INVOKE:
            "[usersRepository.getUser] invoke dummyApi.getUser id={}",
        GET_USER_BY_ID_SUCCESS:
            "[usersRepository.getUser] id={} reply={}",
        GET_USER_BY_ID_ERROR: "[usersRepository.getUser] error={}",
        GET_USER_BY_ID_RESULT: "[usersRepository.getUser] result={}",

        GET_USER_LIST_INVOKE:
            "[usersRepository.getUserList] invoke dummyApi.getUserList page={}, limit={}",
        GET_USER_LIST_SUCCESS:
            "[usersRepository.getUserList] page={}, limit={}, reply={}",
        GET_USER_LIST_ERROR: "[usersRepository.getUserList] error={}",
        GET_USER_LIST_RESULT: "[usersRepository.getUserList] result={}",

        GET_USER_POSTS_INVOKE:
            "[usersRepository.getUserPostList] invoke dummyApi.getUserPostList userId={}, page={}, limit={}",
        GET_USER_POSTS_SUCCESS:
            "[usersRepository.getUserPostList] userId={}, page={}, limit={}, reply={}",
        GET_USER_POSTS_ERROR:
            "[usersRepository.getUserPostList] error={}",
        GET_USER_POSTS_RESULT:
            "[usersRepository.getUserPostList] result={}",

        CREATE_USER_INVOKE:
            "[usersRepository.createUser] invoke dummyApi.createUser user={}",
        CREATE_USER_SUCCESS:
            "[usersRepository.createUser] reply={}",
        CREATE_USER_ERROR:
            "[usersRepository.createUser] error={}",
        CREATE_USER_RESULT:
            "[usersRepository.createUser] result={}",

        UPDATE_USER_INVOKE:
            "[usersRepository.updateUser] invoke dummyApi.updateUser user={}",
        UPDATE_USER_SUCCESS:
            "[usersRepository.updateUser] reply={}",
        UPDATE_USER_ERROR:
            "[usersRepository.updateUser] error={}",
        UPDATE_USER_RESULT:
            "[usersRepository.updateUser] result={}",

        UPLOAD_AVATAR_INVOKE:
            "[usersRepository.uploadUserAvatar] invoke imgDbApi.uploadImg file={}",
        UPLOAD_AVATAR_SUCCESS:
            "[usersRepository.uploadUserAvatar] reply={}",
        UPLOAD_AVATAR_ERROR:
            "[usersRepository.uploadUserAvatar] error={}",
        UPLOAD_AVATAR_RESULT:
            "[usersRepository.uploadUserAvatar] result={}",
    },

    postsRepository: {
        GET_POST_BY_ID_INVOKE:
            "[postsRepository.getPost] invoke dummyApi.getPost id={}",
        GET_POST_BY_ID_SUCCESS:
            "[postsRepository.getPost] id={} reply={}",
        GET_POST_BY_ID_ERROR: "[postsRepository.getPost] error={}",
        GET_POST_BY_ID_RESULT: "[postsRepository.getPost] result={}",

        GET_POST_LIST_INVOKE:
            "[postsRepository.getPostList] invoke dummyApi.getPostList page={}, limit={}",
        GET_POST_LIST_SUCCESS:
            "[postsRepository.getPostList] page={}, limit={}, reply={}",
        GET_POST_LIST_ERROR: "[postsRepository.getPostList] error={}",
        GET_POST_LIST_RESULT: "[postsRepository.getPostList] result={}",

        GET_POST_COMMENTS_INVOKE:
            "[postsRepository.getPostCommentList] invoke dummyApi.getCommentList postId={}, page={}, limit={}",
        GET_POST_COMMENTS_SUCCESS:
            "[postsRepository.getPostCommentList] postId={} reply={}",
        GET_POST_COMMENTS_ERROR:
            "[postsRepository.getPostCommentList] error={}",
        GET_POST_COMMENTS_RESULT:
            "[postsRepository.getPostCommentList] result={}",
    },
};
