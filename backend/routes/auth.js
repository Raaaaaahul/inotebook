//importing files
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = 'signature'
var jwt = require("jsonwebtoken");

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check wheather the user with the same email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
    //   console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "A user already exists with this email!" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user:{
            id:user.id
        }
      }

      const authToken = jwt.sign(data,JWT_SECRET);
      console.log(authToken);
      res.json({authToken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
