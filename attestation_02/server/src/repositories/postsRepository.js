const logger = require("../logger");
const format = require("string-format");
const { postsRepository: messages } = require("../constants/loggerMsg");
const dummyApi = require('../api/dummyApi');
const postsMapper = require('../mappers/postsMapper');
const commentsMapper = require('../mappers/commentsMapper');

class postsRepository {
    getPost(id) {
        logger.info(format(messages.GET_POST_BY_ID_INVOKE, JSON.stringify(id)));
        return dummyApi
            .getPost(id)
            .then((postResp) => {
                logger.info(
                    format(
                        messages.GET_POST_BY_ID_SUCCESS,
                        id,
                        JSON.stringify(postResp)
                    )
                );
                const result = postsMapper.baseInfo(postResp);
                logger.info(
                    format(messages.GET_POST_BY_ID_RESULT, JSON.stringify(result))
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(messages.GET_POST_BY_ID_ERROR, JSON.stringify(error))
                );
                return Promise.reject(postsMapper.baseInfo(error));
            });
    }

    getPostList(page, limit) {
        logger.info(format(messages.GET_POST_LIST_INVOKE, page, limit));
        return dummyApi
            .getPostList(page, limit)
            .then((postResp) => {
                logger.info(
                    format(
                        messages.GET_POST_LIST_SUCCESS,
                        page,
                        limit,
                        JSON.stringify(postResp)
                    )
                );
                const result = postsMapper.listBaseInfo(postResp);
                logger.info(
                    format(messages.GET_POST_LIST_RESULT, JSON.stringify(result))
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(messages.GET_POST_LIST_ERROR, JSON.stringify(error))
                );
                return Promise.reject(postsMapper.baseInfo(error));
            });
    }

    getPostCommentList(postId, page, limit) {
        logger.info(
            format(messages.GET_POST_COMMENTS_INVOKE, postId, page, limit)
        );
        return dummyApi
            .getCommentList(postId, page, limit)
            .then((commentResp) => {
                logger.info(
                    format(
                        messages.GET_POST_COMMENTS_SUCCESS,
                        postId,
                        JSON.stringify(commentResp)
                    )
                );
                const result = commentsMapper.listBaseInfo(commentResp);
                logger.info(
                    format(
                        messages.GET_POST_COMMENTS_RESULT,
                        JSON.stringify(result)
                    )
                );
                return result;
            })
            .catch((error) => {
                logger.error(
                    format(
                        messages.GET_POST_COMMENTS_ERROR,
                        JSON.stringify(error)
                    )
                );
                return Promise.reject(commentsMapper.listBaseInfo(error));
            });
    }
}

module.exports = new postsRepository();
