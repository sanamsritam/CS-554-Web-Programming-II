const express = require("express");
const router = express.Router();
// const data = require("../data");
const peoplesData = require("../data/people");
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/history", async (req, res) => {
  try {
    let test = await client.lrangeAsync("history", 0, 19);
    let test1 = [];
    for (let index = 0; index < test.length; index++) {
      test1[index] = JSON.parse(test[index]);
    }
    res.json(test1);
    // console.log(test1);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id1 = parseInt(req.params.id);
    const all = await client.lrangeAsync("history", 0, -1);
    var flag = 1;
    for (let index = 0; index < all.length; index++) {
      all[index] = JSON.parse(all[index]);
    }
    for (let j = 0; j < all.length; j++) {
      if (all[j].id == id1) {
        await client.lpushAsync("history", [JSON.stringify(all[j])]);
        res.json(all[j]);
        flag = 0;
        return;
      }
    }
    if (flag) {
      const people = await peoplesData.getPersonById(parseInt(req.params.id));
      await client.lpushAsync("history", JSON.stringify(people));
      res.json(people);
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
