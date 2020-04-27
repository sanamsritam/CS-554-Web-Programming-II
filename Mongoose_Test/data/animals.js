const mongoCollection = require("./mongoCollections");
const mongoConfig = require("../settings");
const animals = mongoCollection.animals;
const posts = mongoCollection.posts;
const post = require("./posts");
const { ObjectId } = require("mongodb");
const Animal123 = require("../models/animals");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const conn = mongoose.connect(mongoConfig.env.serverUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: mongoConfig.env.database,
});
// const db = conn.db("test_db");
mongoose.connection
  .once("open", () => console.log("Connected to Atlas Using Mongoose"))
  .on("error", (error) => {
    console.log("error is: " + error);
  });
// const db = conn.db("test_db");

async function get(Id) {
  if (!Id) throw "You must provide an id to search for";
  // const animalCollection = await animals();
  const sanam = Animal123.findById(Id)
    // .select("_id name email animalType likes posts")
    .exec()
    .then((doc) => {
      // console.log(doc);
      if (doc == null) {
        return "ID does not exist";
      }
      return doc;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
      // console.log(err);
      // res.status(500).json({ error: err });
    });
  return sanam;

  // var objId = 0;
  // if (typeof Id == "string") {
  //   objId = ObjectId.createFromHexString(Id);
  // } else {
  //   objId = Id;
  // }
  // // if (!ObjectID.isValid(objId)) throw 'Invalid objectId has been passed';
  // const anim = await animalCollection.findOne({ _id: objId });
  // if (anim === null) throw "No Animals found";
  // //console.log(anim);
  // return anim;
}

async function getAll() {
  // const animalCollection = await animals();
  // const animal = await animalCollection.find({}).toArray();

  // return animal;

  const result = Animal123.find()
    // .select("_id name animalType likes posts")
    .exec()
    .then((docs) => {
      // const response = {
      //   count: docs.length,
      //   animals: docs,
      // };
      // res.status(200).json(docs);
      // if (docs.length >= 1) {
      return docs;
      // } else {
      //   return "No Entries found";
      // }
    })
    .catch((err) => {
      console.log(err);
      return err.message;
      // console.log(err);
      // res.status(500).json({ error: err });
    });
  return result;
}

async function create(name, animalType, email) {
  // console.log("Name: " + name + " & animalType: " + animalType);
  if (!name) throw "You must provide a name for your animal";
  if (Number.isInteger(name) || Number.isInteger(animalType)) {
    throw "Please enter a valid input. Either the name or the animal type is of type number";
  }
  if (typeof animalType == "object") {
    if (animalType.length > 1) throw "You can provide only one breed.";
    animalType = animalType[0];
  }

  // const animalCollection = await animals();

  const test1 = new Animal123({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    animalType: animalType,
    email: email,
    likes: [],
    posts: [],
  });
  // console.log("Inside data/animals/create Printing test1 \n" + test1);
  const sanam = test1
    .save()
    .then((result) => {
      // console.log("Printing result inside data/animals/create " + result);
      // console.log("Printing ID Inside data/animals/create => " + result._id);
      return get(result._id);
      // res.json(result);
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
  // console.log("Printing Sanam: " + sanam);

  return sanam;
  // const Jena = test1.save();
  // console.log("resut= " + Jena);

  // let newAnimal = {
  //   name: name,
  //   animalType: animalType,
  //   likes: [],
  //   posts: [],
  // };

  // const insertInfo = await animalCollection.insertOne(newAnimal);
  // if (insertInfo.insertedCount === 0) throw "Could not add Animal";
  // const newId = insertInfo.insertedId.toString();

  // const animal = await get(newId);
  // return animal;
}

async function remove(Id) {
  if (!Id) throw "You must provide an id to remove";

  // if (typeof Id == "object") {
  //   if (Id.length > 1)
  //     throw "You can provide only one ID to be deleted at a single instance.";
  // }
  // var objId = 0;
  // if (typeof Id == "string") {
  //   objId = ObjectId.createFromHexString(Id);
  // } else {
  //   objId = Id;
  // }
  // // if (!ObjectID.isValid(objId)) throw 'Invalid objectId has been passed';
  // const animalCollection = await animals();
  // const animal_Deleted = await get(objId);

  // console.log(animal_Deleted);

  // if (animal_Deleted == null) throw "Animal to be deleted is not found";
  // for (var i in animal_Deleted.posts) {
  //   var test = await removepost(objId, animal_Deleted.posts[i].id);
  //   if (!test) throw "Removing the post ${animal_Deleted.posts[i].id} failed";
  // }

  // const deleteInfo = await animalCollection.removeOne({ _id: objId });

  // if (deleteInfo.deletedCount === 0) {
  //   throw "Could not delete Animal with id of ${id}";
  // }

  // return animal_Deleted;
  const sanam = Animal123.remove({ _id: Id })
    // .select("_id name animalType likes posts")
    .exec()
    .then((doc) => {
      // console.log(doc);
      // if (doc == null) {
      //   return "ID does not exist";
      // }
      console.log("Printing doc result in delete => " + doc);
      return doc;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
      // console.log(err);
      // res.status(500).json({ error: err });
    });
  return sanam;
}
async function updateNameAndType(Id, value) {
  // console.log(
  //   "Printing value inside data/animals/updateName&Type =>" + value.name
  // );
  // for (var i in value) {
  //   console.log(value[i]);
  // }
  const sanam = Animal123.update({ _id: Id }, { $set: value })
    .exec()
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
      // console.log(err);
      // res.status(500).json({ error: err });
    });
  return sanam;
}

async function removepost(Id, pId) {
  if (!Id) throw "You must provide an id to search for";

  if (typeof Id == "object") {
    if (Id.length > 1)
      throw "You can provide only one ID to be deleted at a single instance.";
  }
  var objId = 0;
  if (typeof Id == "string") {
    objId = ObjectId.createFromHexString(Id);
  } else {
    objId = Id;
  }
  if (!pId) throw "You must provide a post Id to remove";
  const animalCollection = await animals();
  const delpost = await post.dell(pId);
  if (!delpost) {
    throw "Post could not be deleted from post table.";
  }
  const deleteInfo = await animalCollection.updateOne(
    { _id: objId },
    { $pull: { posts: { id: pId } } }
  );
  if (deleteInfo.modifiedCount == 0) {
    throw "Delete Failed";
  }
  //const animalupdates = await get(objId);
  return true;
}
async function rename(Id, newName) {
  if (!Id) throw "You must provide an id to search for";

  if (!newName) throw "You must provide a new name for the animal";

  if (Number.isInteger(newName)) {
    throw "Please enter a valid input for name as name cannot be a number";
  }
  const animalCollection2 = await animals();
  var objId = 0;
  if (typeof Id == "string") {
    objId = ObjectId.createFromHexString(Id);
  } else {
    objId = Id;
  }
  if (typeof newName == "object") {
    if (newName.length > 1) throw "You can provide only one name.";
    newName = newName[0];
  }
  // if (!ObjectID.isValid(objId)) throw 'Invalid objectId has been passed';
  const anim = await animalCollection2.findOne({ _id: objId });
  if (anim === null) throw "No Animals found to rename";

  const updateanimal = {
    name: newName,
  };

  const updateInfo = await animalCollection2.updateOne(
    { _id: objId },
    { $set: updateanimal }
  );
  if (updateInfo.modifiedCount == 0) {
    throw "Update Failed";
  }
  const animalupdates = await get(objId);
  return animalupdates;
}
async function addPostToUser(userId, postId, postTitle) {
  let currentUser = await get(userId);
  //console.log(currentUser);

  const animalCollection = await animals();
  const updateInfo = await animalCollection.updateOne(
    { _id: userId },
    { $addToSet: { posts: { id: postId, title: postTitle } } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";

  return await get(userId);
}

// async function main() {
//   const sasha = await create("Sasha", "Dog");
//   const lucy = await create("Lucy", "Dog");
//   const duke = await create("Duke", "Walrus");
//   console.log(sasha);
//   console.log(lucy);
//   console.log(duke);
//   //   const test1 = await getAll();
//   //   console.log(test1);
//   //   const test2 = await get("5db22e1c3e3a3611ecfc21b7");
//   //   console.log(test2);
//   //   const test3 = await remove("5db3232342e11b345853281f");
//   //   console.log(test3);
//   //   const test4 = await rename("5db22e1c3e3a3611ecfc21b6", "Patrick");
//   //   console.log(test4);
// }

// main();

async function updateAnimal(animalId, postId) {
  if (!animalId) throw "You must provide an id to search for";
  const animalCollection = await animals();
  if (typeof animalId == "object") {
    if (animalId.length > 1)
      throw "You can provide only one ID to be deleted at a single instance.";
  }
  var objId = 0;
  if (typeof animalId == "string") {
    objId = ObjectId.createFromHexString(animalId);
  } else {
    objId = animalId;
  }
  if (!postId) throw "You must provide an id to search for";

  if (typeof postId == "object") {
    if (postId.length > 1)
      throw "You can provide only one ID to be deleted at a single instance.";
  }
  var objId1 = 0;
  if (typeof postId == "string") {
    objId1 = ObjectId.createFromHexString(postId);
  } else {
    objId1 = postId;
  }
  const updateInfo = animalCollection.updateOne(
    { _id: objId },
    { $push: { likes: objId1 } }
  );
  if (updateInfo.nModified == 0) throw "Update failed";

  return true;
}
async function updateAnimal1(animalId, postId) {
  if (!animalId) throw "You must provide an id to search for";
  const animalCollection = await animals();
  if (typeof animalId == "object") {
    if (animalId.length > 1)
      throw "You can provide only one ID to be deleted at a single instance.";
  }
  var objId = 0;
  if (typeof animalId == "string") {
    objId = ObjectId.createFromHexString(animalId);
  } else {
    objId = animalId;
  }
  if (!postId) throw "You must provide an id to search for";

  if (typeof postId == "object") {
    if (postId.length > 1)
      throw "You can provide only one ID to be deleted at a single instance.";
  }
  var objId1 = 0;
  if (typeof postId == "string") {
    objId1 = ObjectId.createFromHexString(postId);
  } else {
    objId1 = postId;
  }

  const updateInfo = animalCollection.updateOne(
    { _id: objId },
    { $pull: { likes: objId1 } }
  );
  if (updateInfo.nModified == 0) throw "Update failed";

  return true;
}

// async function updateNameAndType(animalId, name1, type1) {
//   if (!animalId) throw "You must provide an id to search for";
//   const animalCollection = await animals();
//   if (typeof animalId == "object") {
//     if (animalId.length > 1)
//       throw "You can provide only one ID to be deleted at a single instance.";
//   }
//   var objId = 0;
//   if (typeof animalId == "string") {
//     objId = ObjectId.createFromHexString(animalId);
//   } else {
//     objId = animalId;
//   }

//   if (!name1) throw "Please provide a valid name";
//   if (!type1) throw "Please provide a type";
//   const animalCollection2 = await animals();
//   const updateanimal = {
//     name: name1,
//     animalType: type1,
//   };
//   const updateInfo = await animalCollection2.updateOne(
//     { _id: objId },
//     { $set: updateanimal }
//   );
//   if (updateInfo.modifiedCount == 0) {
//     throw "Update Failed";
//   }
//   const animalupdates = await get(objId);
//   return animalupdates;
// }
// async function main() {
//   var test = await get("5db2533d5a2d761cf8755286");
//   console.log(test.name);
// }

// main();

module.exports = {
  get,
  getAll,
  create,
  remove,
  removepost,
  rename,
  addPostToUser,
  updateAnimal,
  updateAnimal1,
  updateNameAndType,
};
