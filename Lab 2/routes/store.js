const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    res.render("store/home", { title: "Dog Store" });
  } catch (e) {
    res.send(404).json({ e });
  }
});
module.exports = router;
