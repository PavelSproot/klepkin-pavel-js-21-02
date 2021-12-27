const router = require("express").Router();
const usersRouter = require("./usersRouter");
const postsRouter = require("./postsRouter");

router.use("/user", usersRouter);
router.use("/post", postsRouter);

module.exports = router;
