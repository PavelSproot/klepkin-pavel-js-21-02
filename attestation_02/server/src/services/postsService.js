const postsRepository = require("../repositories/postsRepository");
const logger = require("../logger");
const format = require("string-format");
const { postsService: messages } = require("../constants/loggerMsg");

class postsService {
    getPostById(req, res) {
        logger.info(format(messages.GET_POST_BY_ID_PARAMS, req.params.id));
        postsRepository
            .getPost(req.params.id)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.GET_POST_BY_ID_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.GET_POST_BY_ID_ERROR, 520, error));
                res.status(520).json(error);
            });
    }

    getPostList(req, res) {
        logger.info(
            format(messages.GET_POST_LIST_PARAMS, req.params.page, req.params.limit)
        );
        postsRepository
            .getPostList(req.params.page, req.params.limit)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.GET_POST_LIST_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.GET_POST_LIST_ERROR, 520, error));
                res.status(520).json(error);
            });
    }

    getPostCommentList(req, res) {
        logger.info(
            format(
                messages.GET_POST_COMMENTS_PARAMS,
                req.params.id,
                req.params.page,
                req.params.limit
            )
        );
        postsRepository
            .getPostCommentList(req.params.id, req.params.page, req.params.limit)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.GET_POST_COMMENTS_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.GET_POST_COMMENTS_ERROR, 520, error));
                res.status(520).json(error);
            });
    }
}

module.exports = new postsService();
