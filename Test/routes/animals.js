const express = require("express");
const router = express.Router();
const data = require("../data");
const animalsData = data.animals;
const Animal123 = require("../models/animals");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const animal = await animalsData.getAll();
    console.log(
      "Printing animals.length in routes/animals/get => " + animal.length
    );
    if (animal.length >= 1) {
      res.status(200).json(animal);
    } else {
      res.status(404).json({ message: "No animals in list" });
    }
  } catch (e) {
    res.sendStatus(400);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const animal = await animalsData.get(req.params.id);
    console.log("Printing inside routes/animals/get/:id " + animal);
    res.json(animal);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
  }
  // const id = req.params.id;
  // Animal123.findById(id)
  //   .select("_id name animalType likes posts")
  //   .exec()
  //   .then((doc) => {
  //     console.log(doc);
  //     res.status(200).json(doc);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
});

router.post("/", async (req, res) => {
  // const test1 = new Animal123({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: req.body.name,
  //   animalType: req.body.animalType,
  //   likes: [],
  //   posts: [],
  // });

  // console.log("Printing TEST inside routes: \n" + test1);

  // test1
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     res.json(result);
  //   })
  //   .catch((err) => console.log(err));

  const animalInfo = req.body;

  // if (!animalInfo) {
  //   res.status(400).json({ error: "You must provide data to create a animal" });
  //   return;
  // }

  // if (!animalInfo.name) {
  //   res.status(400).json({ error: "You must provide a name" });
  //   return;
  // }

  // if (!animalInfo.animalType) {
  //   res.status(400).json({ error: "You must provide a type" });
  //   return;
  // }

  try {
    // console.log("Inside routes/animals/post Printing " + animalInfo);
    const result1 = await animalsData.create(
      animalInfo.name,
      animalInfo.animalType,
      animalInfo.email
    );
    // console.log("Printing result inside routes: " + result1);
    // console.log("Printing result1._id: " + result1._id);
    // const id = result1._id;
    // console.log("printing after try inside routes/post: " + result1);
    res.status(200).json(result1);
    // Animal123.findById(id)
    //   .select("_id name animalType likes posts")
    //   .exec()
    //   .then((doc) => {
    //     console.log(doc);
    //     res.status(200).json(doc);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({ error: err });
    //   });
    // // res.json({ result: result1 });
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  // const animalInfo = req.body;

  // if (!animalInfo) {
  //   res
  //     .status(400)
  //     .json({ error: "You must provide data to update an animal" });
  //   return;
  // }

  // if (!animalInfo.newName && !animalInfo.newType) {
  //   res.status(400).json({ error: "You must provide a name or a type" });
  //   return;
  // }

  // try {
  //   await animalsData.get(req.params.id);
  // } catch (e) {
  //   res.status(404).json({ error: "Animal not found" });
  //   return;
  // }

  // try {
  //   console.log(req.params.id);
  //   console.log(animalInfo.newName);
  //   console.log(animalInfo.newType);
  //   const data1 = require("../data/animals");
  //   const updatedAnimal = await data1.updateNameAndType(
  //     req.params.id,
  //     animalInfo.newName,
  //     animalInfo.newType
  //   );

  //   res.json(updatedAnimal);
  // } catch (e) {
  //   console.log(e);
  //   res.sendStatus(500);
  // }
  try {
    const Id = req.params.id;
    // console.log("Printing ID inside routes/animals/put => " + Id);
    const updateOps = {
      name: req.body.name,
      email: req.body.email,
      animalType: req.body.animalType,
    };
    // console.log("Printing req.body => " + req.body.name);
    // updateOps[name] = req.body.name;
    // updateOps[email] = req.body.email;
    // updateOps[animalType] = req.body.animalType;
    const animal = await animalsData.updateNameAndType(Id, req.body);
    // console.log("Printing animal inside routes/animals/put => " + animal);
    // console.log("Printing OPs inside routes/animals/put => " + updateOps);
    if (animal.nModified == 1) {
      res.status(200).json({ Message: "Successfully Updated" });
    } else {
      res.status(200).json({ Message: "There is nothing to Update" });
    }
    res.status(200).json(animal);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  // try {
  //   await animalsData.get(req.params.id);
  // } catch (e) {
  //   res.status(404).json({ error: "Animal not found" });
  //   return;
  // }
  // console.log(req.params.id);
  // try {
  //   const data1 = require("../data/animals");
  //   const deleted = await data1.remove(req.params.id);
  //   res.json(deleted);
  //   console.log("Printing the deleted DATA: ---> " + deleted);
  // } catch (e) {
  //   res.sendStatus(500);
  // }
  try {
    const animal = await animalsData.remove(req.params.id);
    if (animal.deletedCount == 1) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      if (animal.n == 0) {
        res.status(500).json({ message: "Delete failed ID not found" });
      }
      res.status(500).json({ message: "Delete failed" });
    }
    res.json(animal);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
  }
});

module.exports = router;
