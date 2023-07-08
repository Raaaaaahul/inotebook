//importing files
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "signature";
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
//route1
//creating a user using POST: "/api/auth" , doesnot require auth
router.post(
  "/createuser",
  [
    body("name", "Please enter a valid name").isLength({ min: 3 }),
    body("email", "Please enter valid email address!").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //return bad request in case error is encountered
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }
    //check wheather the user with the same email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      //   console.log(user);
      if (user) {
        return res
          .status(400)
          .json({success, error: "A user already exists with this email!" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(success,authToken);
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR ");
    }
  }
);

//route 2
//Authenticate a user using POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if error occured return the error message
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //if validation was successfull then
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //if the user doesnot exists in the database
      if (!user) {
        success = false
        return res.status(400).json({success, error: "Wrong Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      //if the password entered by the user doesnot matches the password in the database
      if (!passwordCompare) {
        success = false
        return res.status(400).json({success, error: "Wrong Credentials" });
      }
      //if user exists and the password of the user validates then
      //we will send the payload

      const data = {
        user: {
          id: user.id,
        },
      };
      //sign the document using authToken
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

//Route 3: Get logged in user detail using post /api/auth/getuser . it will require login

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});

module.exports = router;
