const router = require("express").Router();
const usersService = require("../services/usersService");

router.get("/:id", usersService.getUserById);
router.get("/:page/:limit", usersService.getUserList);
router.get("/:id/post/:page/:limit", usersService.getUserPostList);

router.post("/create", usersService.createUser);
router.put("/:id", usersService.updateUser);

module.exports = router;
