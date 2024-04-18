const ReviewController = require("../controllers/reviewController");
const route = require("express").Router();

route.get("/", ReviewController.getReview); //tampilkan dengan user dan anime
route.post("/", ReviewController.createReview);
route.get("/:id", ReviewController.getReviewById);
route.put("/:id", ReviewController.updateReview);
route.delete("/:id", ReviewController.deleteReview);

module.exports = route;
