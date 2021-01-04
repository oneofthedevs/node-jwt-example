const router = require("express").Router();
const {
  login,
  refreshToken,
  createUser,
  logout,
} = require("../controllers/authController");

router.post("/login", login);

router.post("/routesrefreshToken", refreshToken);

router.delete("/logout", logout);

router.post("/createUser", createUser);

module.exports = router;
