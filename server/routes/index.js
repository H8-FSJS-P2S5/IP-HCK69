const route = require("express").Router();
const routeUser = require("./userRoute");
const routeManhwa = require("./manhwaRoute");
const routeReview = require("./reviewRoute");

route.use("/users", routeUser);
route.use("/manhwas", routeManhwa);
route.use("/reviews", routeReview);

module.exports = route;
