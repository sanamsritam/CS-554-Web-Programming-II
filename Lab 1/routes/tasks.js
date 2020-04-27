const express = require("express");
const router = express.Router();
const taskData = require("../data/tasks");

// Router to get taskbyID
router.get("/:id", async (req, res) => {
  try {
    //console.log("PRINTING ID" + req.params.id);
    const task = await taskData.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (e) {
    res.status(404).json({ message: "Task not found" });
  }
});

// Router to getAll
router.get("/", async (req, res) => {
  try {
    var skip = 0;
    var take = 20;
    if (req.query.skip) {
      skip = parseInt(req.query.skip);
      if (isNaN(skip)) throw "Value of skip should be a number";
    }
    if (req.query.take) {
      take = parseInt(req.query.take);
      if (isNaN(take)) throw "Value of take should be a number";
    }
    if (take > 100) {
      take = 100;
    }
    const tasks = await taskData.getAll();
    res.status(200).json(tasks.slice(skip).slice(0, take));
  } catch (e) {
    res.status(500).json({ e });
  }
});

//Router to create task
router.post("/", async (req, res) => {
  try {
    if (req.body.completed === "") throw "Please provide completed value";
    const create1 = await taskData.createTask(
      req.body.title,
      req.body.description,
      req.body.hoursEstimated,
      req.body.completed
    );
    res.status(200).json(create1);
  } catch (e) {
    res.status(500).json({ e });
  }
});

// Router to create comment
router.post("/:id/comments", async (req, res) => {
  try {
    // console.log(
    //   "Printing inside routes/task/ router.post /:id/comments" +
    //     req.params.id +
    //     " is the ID " +
    //     req.body.name +
    //     " is the name " +
    //     " & comment is" +
    //     req.body.comment
    // );
    const Updatecomment = await taskData.addComment(
      req.params.id,
      req.body.name,
      req.body.comment
    );
    res.status(200).json(Updatecomment);
  } catch (e) {
    res.status(500).json({ e });
  }
});

// Router to delete comment
router.delete("/:taskId/:commentId", async (req, res) => {
  try {
    const del1 = await taskData.deleteComment(
      req.params.taskId,
      req.params.commentId
    );
    res.status(200).json(del1);
  } catch (e) {
    res.status(500).json({ e });
  }
});

// Router to patch Task
router.patch("/:id", async (req, res) => {
  try {
    if (req.body.completed === "") throw "Please provide completed value";
    // const patch1 = await taskData.patchTask(
    //   req.params.id,
    //   req.body.title,
    //   req.body.description,
    //   req.body.hoursEstimated,
    //   req.body.completed
    // );
    // console.log("Printing req.body" + req.body);
    const patch2 = await taskData.patchTask(req.params.id, req.body);
    res.status(200).json(patch2);
  } catch (e) {
    res.status(500).json({ e });
  }
});

//Router to put Task
router.put("/:id", async (req, res) => {
  try {
    if (req.body.completed === "") throw "Please provide completed value";
    const put1 = await taskData.putTask(
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.hoursEstimated,
      req.body.completed
    );
    res.status(200).json(put1);
  } catch (e) {
    res.status(500).json({ e });
  }
});

module.exports = router;
