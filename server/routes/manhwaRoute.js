const ManhwaController = require("../controllers/manhwaController");
const route = require("express").Router();

route.get("/", ManhwaController.getManhwa);
route.post("/", ManhwaController.createManhwa); //buat memasukan manhwa ke db
route.get("/:id", ManhwaController.getManhwaById); //tampilkan dengan review kalo bisa

module.exports = route;
