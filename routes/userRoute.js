const bcrypt = require("bcryptjs");
const User = require("../model/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const { email, password } = req.body.formData;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists! please use another Email" });
    }
    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const result = await user.save();
    const token = jwt.sign({ userId: result._id }, process.env.MY_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(201).json({
      msg: "User registered successfully",
      result: {
        email: result.email,
      },
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res
      .status(200)
      .json({ msg: "Login successful", result: { email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
