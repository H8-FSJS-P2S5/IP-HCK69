"use strict"
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

router.get("/", (req, res) => {
    res.status(200).json({
        message : "Masukk"
    })
});

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.use(authentication);

router.put("/update-profile", userController.updateProfile);

router.get("/contacts", (req, res) => {

});

router.get("/contacts/:id", (req, res) => {

});

router.patch("/contacts/:id", (req, res) => {

});

router.get("/messages", (req, res) => {

});

router.post("/messages", (req, res) => {

});


module.exports = router;