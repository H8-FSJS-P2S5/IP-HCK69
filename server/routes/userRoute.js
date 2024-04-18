const UserController = require("../controllers/userController");
const route = require("express").Router();

route.post("/login", UserController.loginUser);
route.post("/add-user", UserController.registerUser);
route.post("/login/google", UserController.loginUserGoogle);
route.get("/:id", UserController.getUserById); //tampilkan review yang tergabung dengan user
route.put("/:id", UserController.updateUserById);
route.patch("/:id/isRich", UserController.updateUserIsRichById);

module.exports = route;
