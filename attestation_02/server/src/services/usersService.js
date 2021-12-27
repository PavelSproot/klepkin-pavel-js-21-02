const usersRepository = require("../repositories/usersRepository");
const logger = require("../logger");
const format = require("string-format");
const { usersService: messages } = require("../constants/loggerMsg");

class usersService {
    getUserById(req, res) {
        logger.info(format(messages.GET_USER_BY_ID_PARAMS, req.params.id));
        usersRepository
            .getUser(req.params.id)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.GET_USER_BY_ID_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.GET_USER_BY_ID_ERROR, 520, error));
                res.status(520).json(error);
            });
    }

    getUserList(req, res) {
        logger.info(format(messages.GET_USER_LIST_PARAMS, req.params.page, req.params.limit));
        usersRepository
            .getUserList(req.params.page, req.params.limit)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.GET_USER_LIST_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.GET_USER_LIST_ERROR, 520, error));
                res.status(520).json(error);
            });
    }

    getUserPostList(req, res) {
        logger.info(
            format(
                messages.GET_USER_POST_LIST_PARAMS,
                req.params.id,
                req.params.page,
                req.params.limit
            )
        );

        usersRepository
            .getUserPostList(req.params.id, req.params.page, req.params.limit)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.GET_USER_POST_LIST_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.GET_USER_POST_LIST_ERROR, 520, error));
                res.status(520).json(error);
            });
    }

    createUser(req, res) {
        logger.info(
            format(messages.CREATE_USER_PARAMS, JSON.stringify(req.body))
        );
        usersRepository
            .createUser(req.body)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.CREATE_USER_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.CREATE_USER_ERROR, 520, error));
                res.status(520).json(error);
            });
    }

    updateUser(req, res) {
        logger.info(
            format(messages.UPDATE_USER_PARAMS, req.params.id, JSON.stringify(req.body))
        );
        usersRepository
            .updateUser(req.body)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.UPDATE_USER_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.UPDATE_USER_ERROR, 520, error));
                res.status(520).json(error);
            });
    }

    uploadAvatar(req, res) {
        logger.info(
            format(messages.UPLOAD_AVATAR_PARAMS, req.file.originalname)
        );
        usersRepository
            .uploadUserAvatar(req.file)
            .then((response) => {
                const result = JSON.stringify(response);
                logger.info(format(messages.UPLOAD_AVATAR_SUCCESS, 200, result));
                res.status(200).send(result);
            })
            .catch((error) => {
                logger.error(format(messages.UPLOAD_AVATAR_ERROR, 520, error));
                res.status(520).json(error);
            });
    }
}

module.exports = new usersService();
