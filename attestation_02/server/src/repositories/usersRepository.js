const logger = require("../logger");
const format = require("string-format");
const { usersRepository: messages } = require("../constants/loggerMsg");
const dummyApi = require('../api/dummyApi');
const usersMapper = require('../mappers/usersMapper');
const postsMapper = require('../mappers/postsMapper');

class usersRepository {
    getUser(id) {
        logger.info(format(messages.GET_USER_BY_ID_INVOKE, JSON.stringify(id)));
        return dummyApi
            .getUser(id)
            .then((postResp) => {
                logger.info(
                    format(
                        messages.GET_USER_BY_ID_SUCCESS,
                        id,
                        JSON.stringify(postResp)
                    )
                );
                const result = usersMapper.baseInfo(postResp);
                logger.info(
                    format(messages.GET_USER_BY_ID_RESULT, JSON.stringify(result))
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(messages.GET_USER_BY_ID_ERROR, JSON.stringify(error))
                );
                return Promise.reject(usersMapper.baseInfo(error));
            });
    }

    getUserList(page, limit) {
        logger.info(format(messages.GET_USER_LIST_INVOKE, page, limit));
        return dummyApi
            .getUserList(page, limit)
            .then((postResp) => {
                logger.info(
                    format(
                        messages.GET_USER_LIST_SUCCESS,
                        page,
                        limit,
                        JSON.stringify(postResp)
                    )
                );
                const result = usersMapper.makeUserList(postResp);
                logger.info(
                    format(messages.GET_USER_LIST_RESULT, JSON.stringify(result))
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(messages.GET_USER_LIST_ERROR, JSON.stringify(error))
                );
                return Promise.reject(usersMapper.baseInfo(error));
            });
    }

    getUserPostList(userId, page, limit) {
        logger.info(
            format(messages.GET_USER_POSTS_INVOKE, userId, page, limit)
        );
        return dummyApi
            .getPostList(page, limit, userId)
            .then((postResp) => {
                logger.info(
                    format(
                        messages.GET_USER_POSTS_SUCCESS,
                        userId,
                        page,
                        limit,
                        JSON.stringify(postResp)
                    )
                );
                const result = postsMapper.listBaseInfo(postResp);
                logger.info(
                    format(
                        messages.GET_USER_POSTS_RESULT,
                        JSON.stringify(result)
                    )
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(
                        messages.GET_USER_POSTS_ERROR,
                        JSON.stringify(error)
                    )
                );
                return Promise.reject(postsMapper.listBaseInfo(error));
            });
    }

    createUser(user) {
        logger.info(
            format(messages.CREATE_USER_INVOKE, JSON.stringify(user))
        );
        if (!user.id) {
            const required = usersMapper.checkRequired(user);
            if (required.length > 0) {
                return Promise.reject(
                    usersMapper.baseInfo({
                        error: "error",
                        required: required,
                    })
                );
            }
        }
        return dummyApi
            .createUser(usersMapper.prepareForDummy(user))
            .then((userResp) => {
                logger.info(
                    format(
                        messages.CREATE_USER_SUCCESS,
                        JSON.stringify(userResp)
                    )
                );
                const result = usersMapper.baseInfo(userResp);
                logger.info(
                    format(
                        messages.CREATE_USER_RESULT,
                        JSON.stringify(result)
                    )
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(messages.CREATE_USER_ERROR, JSON.stringify(error))
                );
                return Promise.reject(usersMapper.baseInfo(error));
            });
    }

    updateUser(userId, user) {

    }

    uploadUserAvatar(userId, avatar) {

    }
}

module.exports = new usersRepository();
