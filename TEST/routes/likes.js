const express = require("express");
const router = express.Router();
const likes = require("../data/likes");

router.post("/:id", async (req, res) => {
  try {
    await likes.like(req.params.id, req.query.postId);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await likes.unlike(req.params.id, req.query.postId);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
