const express = require("express");
const router = express.Router();

const {registerUser,loginUser,currentUser}=require("../Controller/UserController");
const validToken = require("../middleware/validateTokenHandler");

// router.route("/login").get(registerUser);

router.post('/register',registerUser);
router.post("/login",loginUser); 
router.get("/current",validToken,currentUser);


module.exports = router;