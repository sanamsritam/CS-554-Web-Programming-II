const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;
const { ObjectId } = require("mongodb");

router.get("/:id", async (req, res) => {
  try {
    const post = await postData.get(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const postList = await postData.getAllPosts();
    res.json(postList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const test = req.body;
  console.log(test);
  try {
    //console.log(req.body);
    const { title, author, content } = test;
    const newPost = await postData.addPost(title, content, author);
    res.status(200).json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  if (!updatedData) {
    res.status(400).json({ error: "You need to provide data to update post" });
    return;
  }
  if (!updatedData.newTitle && !updatedData.newContent) {
    res
      .status(400)
      .json({ error: "You must provide title & content to be updated" });
    return;
  }

  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  try {
    const updatedPost = await postData.updatePost(req.params.id, updatedData);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  try {
    const deleted = await postData.removePost(req.params.id);
    res.json(deleted);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
