const mongoCollection = require("./mongoCollections");
const animals = mongoCollection.animals;
const animal = require("./animals");
const posts = mongoCollection.posts;
const { ObjectId } = require("mongodb");
const uuid = require("uuid/v4");

// const exportedMethods = {
async function getAllPosts() {
  const postCollection = await posts();
  return await postCollection.find({}).toArray();
}
// async function getPostsByTag(tag) {
//   if (!tag) throw "No tag provided";

//   const postCollection = await posts();
//   return await postCollection.find({ tags: tag }).toArray();
// }
async function get(Id) {
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
  const postCollection = await posts();
  const post = await postCollection.findOne({ _id: objId });

  if (!post) throw "Post not found";
  return post;
}
async function addPost(title, content, authorId) {
  console.log(authorId);
  console.log(title);
  console.log(content);
  if (!authorId) throw "You must provide an id to Create a new Post";
  const animalCollection = await animals();

  var objId = 0;
  if (typeof authorId == "string") {
    objId = ObjectId.createFromHexString(authorId);
  } else {
    objId = authorId;
  }
  if (typeof title !== "string") throw "Please enter title of type string";
  if (typeof content !== "string") throw "Please content of type String";
  console.log(objId);
  //   if (!Array.isArray(tags)) {
  //     tags = [];
  //   }

  const postCollection = await posts();
  //const animalCollection = await animals();
  const aonimal = require("./animals");
  const userThatPosted = await aonimal.get(objId);

  console.log(userThatPosted);

  const newPost = {
    title: title,
    content: content,
    author: {
      id: objId,
      name: `${userThatPosted.name}`
    }
    //tags: tags
    //_id: uuid()
  };

  const newInsertInformation = await postCollection.insertOne(newPost);
  const newId = newInsertInformation.insertedId;

  await aonimal.addPostToUser(objId, newId, title);
  const returning = await get(newId);
  console.log("Printing return value ---> " + returning);
  return returning;
}
async function removePost(Id) {
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
  const postCollection = await posts();
  let post = null;
  try {
    post = await get(objId);
  } catch (e) {
    console.log(e);
    return;
  }
  const deletionInfo = await postCollection.removeOne({ _id: objId });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${objId}`;
  }
  await animal.removepost(post.author.id, objId);
  return post;
}

async function dell(Id) {
  if (!Id) throw "You must provide an id to search for";

  if (typeof Id == "object") {
    if (Id.length > 1)
      throw "You can provide only one ID to be deleted at a single instance.";
  }
  var objId = Id;
  // if (typeof Id == "string") {
  //   objId = ObjectId.createFromHexString(Id);
  // } else {
  //   objId = Id;
  // }
  const postCollection = await posts();
  let post1234 = null;
  try {
    post1234 = await get(objId);
  } catch (e) {
    console.log(e);
    return false;
  }
  const deletionInfo = await postCollection.removeOne({ _id: objId });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${objId}`;
  }

  return true;
}

async function updatePost(Id, updatedPost) {
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
  const postCollection = await posts();

  const updatedPostData = {};

  //   if (updatedPost.tags) {
  //     updatedPostData.tags = updatedPost.tags;
  //   }

  if (updatedPost.title) {
    updatedPostData.title = updatedPost.title;
  }

  if (updatedPost.content) {
    updatedPostData.content = updatedPost.content;
  }

  const updateInfo = await postCollection.updateOne(
    { _id: objId },
    { $set: updatedPostData }
  );
  if (updateInfo.modifiedCount == 0) {
    throw "Update Failed";
  }
  return await get(objId);
}
// async function renameTag(oldTag, newTag) {
//   if (oldTag === newTag) throw "tags are the same";
//   let findDocuments = {
//     tags: oldTag
//   };

//   let firstUpdate = {
//     $addToSet: { tags: newTag }
//   };

//   let secondUpdate = {
//     $pull: { tags: oldTag }
//   };

//   const postCollection = await posts();
//   await postCollection.updateMany(findDocuments, firstUpdate);
//   await postCollection.updateMany(findDocuments, secondUpdate);

//   return await this.getPostsByTag(newTag);
// }
// };
module.exports = {
  get,
  getAllPosts,
  addPost,
  removePost,
  //   getPostsByTag,
  updatePost,
  //   renameTag,
  dell
};

//module.exports = exportedMethods;
// async function main() {
//   //   try {
//   const test1 = await addPost(
//     "LANJA",
//     "TESTING 123",
//     "5dd7410914bd10382cd1e491"
//   );
//   const test2 = await addPost(
//     "LANJA1",
//     "TESTING 1234",
//     "5dd7410914bd10382cd1e491"
//   );
//   const test3 = await addPost(
//     "LANJA2",
//     "TESTING 12345",
//     "5dd7410914bd10382cd1e491"
//   );
//   const test4 = await addPost(
//     "LANJA3",
//     "TESTING 123456",
//     "5dd7410914bd10382cd1e491"
//   );
// const test2 = await get("5db27ceca11a824388bbfc14");
// console.log(test1);
// console.log(test2);
// const test3 = await removePost("5db27e8213939c4d9421ddb0");
// console.log(test3);
// var upd = {};
// upd.title = "NUA TITLE";
// upd.content = "NUA BODY";
// upd.tags = ["NUA TAG"];
// const test4 = await updatePost("5db2542f9b26be18f4c23605", upd);
// console.log(test4);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main();
