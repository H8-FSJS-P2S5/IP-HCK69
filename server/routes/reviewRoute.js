const ReviewController = require("../controllers/reviewController");
const { authentication, guardAuthorOnly } = require("../middlewares");
const route = require("express").Router();

route.use(authentication);
route.get("/", ReviewController.getReview); //tampilkan dengan user dan anime
route.post("/", ReviewController.createReview);
route.get("/:id", ReviewController.getReviewById);
route.use(guardAuthorOnly);
route.put("/:id", ReviewController.updateReview);
route.delete("/:id", ReviewController.deleteReview);

module.exports = route;
