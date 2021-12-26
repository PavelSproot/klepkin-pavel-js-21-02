const logger = require("../logger");
const format = require("string-format");
const { usersRepository: messages } = require("../constants/loggerMsg");
const dummyApi = require('../api/dummyApi');
const avatarImg = require('../api/imgBB');
const usersMapper = require('../mappers/usersMapper');
const postsMapper = require('../mappers/postsMapper');
const imageMapper = require('../mappers/imageMapper');

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

    updateUser(user) {
        logger.info(
            format(messages.UPDATE_USER_INVOKE, JSON.stringify(user))
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
            .editUser(usersMapper.prepareForDummyEdit(user))
            .then((userResp) => {
                logger.info(
                    format(
                        messages.UPDATE_USER_SUCCESS,
                        JSON.stringify(userResp)
                    )
                );
                const result = usersMapper.baseInfo(userResp);
                logger.info(
                    format(
                        messages.UPDATE_USER_RESULT,
                        JSON.stringify(result)
                    )
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(messages.UPDATE_USER_ERROR, JSON.stringify(error))
                );
                return Promise.reject(usersMapper.baseInfo(error));
            });
    }

    uploadUserAvatar(avatar) {
        logger.info(
            format(messages.UPLOAD_AVATAR_INVOKE, avatar.originalname)
        );
        return avatarImg.uploadAvatar(avatar)
            .then((avtResp) => {
                logger.info(
                    format(
                        messages.UPLOAD_AVATAR_SUCCESS,
                        JSON.stringify(avtResp)
                    )
                );
                if (avtResp.success === true) {
                    const result = imageMapper.makeUrl(avtResp.data);
                    logger.info(
                        format(
                            messages.UPLOAD_AVATAR_RESULT,
                            JSON.stringify(result)
                        )
                    );
                    return result;
                } else {
                    return Promise.reject({ error: "error" });
                }
            })
            .catch((error) => {
                logger.error(
                    format(
                        messages.UPLOAD_AVATAR_ERROR,
                        JSON.stringify(error)
                    )
                );
                return Promise.reject(imageMapper.makeUrl(error));
            });
    }
}

module.exports = new usersRepository();
