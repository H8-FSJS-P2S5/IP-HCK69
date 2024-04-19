const ManhwaController = require("../controllers/manhwaController");
const { authentication } = require("../middlewares");
const route = require("express").Router();

route.use(authentication);
route.get("/", ManhwaController.getManhwa);
route.get("/:id", ManhwaController.getManhwaById); //tampilkan dengan review kalo bisa
route.post("/:id", ManhwaController.createManhwa); //buat memasukan manhwa ke db

module.exports = route;
