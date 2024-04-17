const route = require("express").Router();

route.get("/");
route.post("/");
route.get("/mine");
route.put("/mine/:id");
route.delete("/mine/:id");

module.exports = route;
