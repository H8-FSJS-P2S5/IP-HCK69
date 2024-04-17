const ManhwaController = require("../controllers/manhwaController");
const route = require("express").Router();

route.get("/", ManhwaController.getManhwa);
route.post("/", ManhwaController.createManhwa);

module.exports = route;
