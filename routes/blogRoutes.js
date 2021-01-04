const router = require("express").Router();
const { authenticate } = require("../controllers/authController");
const blogController = require("../controllers/blogController");

router.get("", blogController.getAllPosts);

router.post("/insert", authenticate, blogController.createPost);

module.exports = router;
