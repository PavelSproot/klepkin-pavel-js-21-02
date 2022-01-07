const router = require("express").Router();
const postsService = require("../services/postsService");

router.get("/:id", postsService.getPostById);
router.get("/:page/:limit", postsService.getPostList);
router.get("/:id/comment/:page/:limit", postsService.getPostCommentList);

module.exports = router;
