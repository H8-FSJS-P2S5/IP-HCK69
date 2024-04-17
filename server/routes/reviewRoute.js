const ReviewController = require("../controllers/reviewController");
const route = require("express").Router();

route.get("/", ReviewController.getReview);
route.post("/", ReviewController.createReview);
route.get("/mine", ReviewController.getMyReview);
route.put("/mine/:id", ReviewController.updateMyReview);
route.delete("/mine/:id", ReviewController.deleteMyReview);

module.exports = route;
