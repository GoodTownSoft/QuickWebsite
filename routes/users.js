const express = require("express");
const router = express.Router();
const User = require("../models/user");

//getting all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//creating one
router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    boughtTicketsToShow: req.body.boughtTicketsToShow,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating one
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.boughtTicketsToShow != null)
    res.user.boughtTicketsToShow = req.body.boughtTicketsToShow;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleteing one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getUser
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: res.message });
  }

  res.user = user;
  next();
}

module.exports = router;
