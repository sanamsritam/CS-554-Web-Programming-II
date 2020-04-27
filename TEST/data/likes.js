const mongoCollection = require("./mongoCollections");
const animals = mongoCollection.animals;
const animal = require("./animals");
const post = require("./posts");
const posts = mongoCollection.posts;
const { ObjectId } = require("mongodb");

async function like(animalId, postId) {
  if (!animalId || animalId == null || animalId == undefined)
    throw "Please enter a valid animal Id";
  if (!postId || postId == null || postId == undefined)
    throw "Please enter a valid post Id";

  var objId = 0;
  if (typeof animalId == "string") {
    objId = ObjectId.createFromHexString(animalId);
  } else {
    objId = animalId;
  }
  var objId1 = 0;
  if (typeof animalId == "string") {
    objId1 = ObjectId.createFromHexString(postId);
  } else {
    objId1 = postId;
  }

  const animalchk = await animal.get(objId);

  const postchk = await post.get(objId1);
  const test = await animal.updateAnimal(objId, objId1);
  if (!test) throw "Update failed";
}

async function unlike(animalId, postId) {
  if (!animalId || animalId == null || animalId == undefined)
    throw "Please enter a valid animal Id";
  if (!postId || postId == null || postId == undefined)
    throw "Please enter a valid post Id";

  var objId = 0;
  if (typeof animalId == "string") {
    objId = ObjectId.createFromHexString(animalId);
  } else {
    objId = animalId;
  }
  var objId1 = 0;
  if (typeof animalId == "string") {
    objId1 = ObjectId.createFromHexString(postId);
  } else {
    objId1 = postId;
  }

  const animalchk = await animal.get(objId);

  const postchk = await post.get(objId1);
  const test = await animal.updateAnimal1(objId, objId1);
  if (!test) throw "Update failed";
}

module.exports = {
  like,
  unlike
};

async function main() {
  try {
    const test = await unlike(
      "5db2533d5a2d761cf8755286",
      "5db3acb381dce238ccb17a1d"
    );
  } catch (error) {
    console.log(error);
  }
}

main();
