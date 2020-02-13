const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    res.render("store/main", { title: "Pet Store" });
  } catch (e) {
    res.send(404).json({ e });
  }
});
module.exports = router;
