const UserController = require("../controllers/userController");
const { authentication } = require("../middlewares");
const route = require("express").Router();

route.post("/login", UserController.loginUser);
route.post("/login/google", UserController.loginUserGoogle);
route.post("/add-user", UserController.registerUser);
route.use(authentication);
route.get("/", UserController.getUserSelf); //tampilkan review yang tergabung dengan user
route.put("/", UserController.updateUserSelf);
route.patch("/isRich", UserController.updateUserIsRichSelf);
route.post("/generate-midtrans-token", UserController.generateMidtransToken);

module.exports = route;
