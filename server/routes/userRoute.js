const UserController = require("../controllers/userController");
const route = require("express").Router();

route.get("/", UserController.getUserSelf); //tampilkan review yang tergabung dengan user
route.put("/", UserController.updateUserSelf);
route.patch("/isRich", UserController.updateUserIsRichSelf);
route.post("/generate-midtrans-token", UserController.generateMidtransToken);
route.post("/login", UserController.loginUser);
route.post("/add-user", UserController.registerUser);
route.post("/login/google", UserController.loginUserGoogle);

module.exports = route;
