const mongoCollections = require("../config/mongoCollections");
const uuid = require("node-uuid");
const tasks = mongoCollections.tasks;
const { ObjectId } = require("mongodb");

async function getAll() {
  const taskscollection = await tasks();
  const task = await taskscollection.find({}).toArray();
  return task;
}

async function getTaskById(Id) {
  if (!Id) throw "You must provide an id to search for";
  const taskscollection = await tasks();
  //   var objId = 0;
  //   if (typeof Id == "string") {
  //     objId = ObjectId.createFromHexString(Id);
  //   } else {
  //     objId = Id;
  //   }
  const task = await taskscollection.findOne({ _id: Id });
  if (task === null) throw "No Tasks found";
  return task;
}

async function createTask(title, description, hoursestimated, completed) {
  console.log(
    "Printing Params Inside Data/TASKS" +
      title +
      description +
      hoursestimated +
      completed
  );
  if (!title) throw "You must provide a Title to add Comment";
  if (typeof title !== "undefined" && typeof title !== "string")
    throw "Title must be of string";
  if (!description) throw "You must provide a Description to add Comment";
  if (typeof description !== "undefined" && typeof description !== "string")
    throw "Description must be of string";
  if (!hoursestimated) throw "You must provide a HoursEstimated to add Comment";
  if (
    typeof hoursestimated !== "undefined" &&
    typeof hoursestimated !== "number"
  )
    throw "Hours Estimated must be of number";

  if (typeof completed !== "undefined" && typeof completed !== "boolean")
    throw "Completed must be of number";

  //   console.log(completed);
  //console.log(comments[0][person]);
  //   console.log("Comment[0].[0]" + comments[0].[0]);
  //   console.log("Comment[1]" + comments[1]);
  //   console.log("Comment[2]" + comments[2]);

  //   console.log(typeof completed == Boolean);

  //   if (!completed) throw "Task must be provided with the completed values";
  //   if (typeof completed == Boolean) throw "Task must be of type Boolean";
  //   let newcomm = {
  //     name: comments[0],
  //     comment: comments[1]
  //   };

  const taskscollection = await tasks();
  let newTask = {
    _id: uuid.v4(),
    title: title,
    description: description,
    hoursEstimated: hoursestimated,
    completed: completed,
    comments: []
    //comments: newcomm
  };

  const insertInfo = await taskscollection.insertOne(newTask);
  if (insertInfo.insertedCount === 0) throw "Could not add Task";
  let taskcreatedId = insertInfo.insertedId;
  //
  //const newId = insertInfo.insertedId.toString();
  // try {
  //   const ins = await addComment(
  //     taskcreatedId,
  //     comments[0].poster,
  //     comments[0].comment
  //   );
  //   if (ins.modifiedCount === 0) throw "ADDING COMMENT FAILED";
  // } catch (e) {
  //   console.log(e);
  // }
  const task = await getTaskById(insertInfo.insertedId);
  return task;
}

async function addComment(taskId, poster, comment1) {
  //   console.log(
  //     "Printing Params Inside Data/TASKS/ addComment " +
  //       taskId +
  //       poster +
  //       comment1
  //   );
  if (!taskId) throw "You must provide a TaskId to add Comment";
  const taskscollection = await tasks();
  //   var objId = 0;
  //   if (typeof taskId == "string") {
  //     objId = ObjectId.createFromHexString(taskId);
  //   } else {
  //     objId = taskId;
  //   }
  if (!poster) throw "Poster name does not exist";
  if (Number.isInteger(poster)) throw "Poster Name cannot be a number";
  if (poster === "") throw "Poster cannot be empty";

  if (!comment1) throw "Comment does nto exist";
  if (Number.isInteger(comment1)) throw "Comment cannot be a number";
  if (comment1 === "") throw "Comment cannot be empty";
  const task = await taskscollection.findOne({ _id: taskId });
  if (task === null) throw "No Tasks found";

  let comm = {
    _id: uuid.v4(),
    name: poster,
    comment: comment1
  };

  const updInfo = await taskscollection.updateOne(
    { _id: taskId },
    { $addToSet: { comments: comm } }
  );
  if (updInfo.modifiedCount == 0) {
    throw "Update Failed";
  }
  const task1 = await getTaskById(taskId);
  return task1;
}

async function deleteComment(taskId, commentId) {
  if (!taskId) throw "You must provide a TaskId to delete comment";
  const taskscollection = await tasks();
  //   var objId = 0;
  //   if (typeof taskId == "string") {
  //     objId = ObjectId.createFromHexString(taskId);
  //   } else {
  //     objId = taskId;
  //   }

  if (!commentId) throw "You must provide a commentId to delete comment";
  const task = await taskscollection.findOne({ _id: taskId });
  if (task === null) throw "No Tasks found";

  let comment = await taskscollection.findOne(
    { _id: taskId },
    { comments: { _id: commentId } }
  );
  if (!comment) throw "Comment not found";

  const deleteInfo = await taskscollection.updateOne(
    { _id: taskId },
    { $pull: { comments: { _id: commentId } } }
  );
  if (deleteInfo.modifiedCount == 0) {
    throw "Delete Failed";
  }
  const task1 = await getTaskById(taskId);
  return task1;
}

async function putTask(taskId, title, description, hoursestimated, completed) {
  if (!taskId) throw "You must provide a TaskId to add Comment";
  if (!title) throw "You must provide a Title to add Comment";
  if (typeof title !== "undefined" && typeof title !== "string")
    throw "Title must be of string";
  if (!description) throw "You must provide a Description to add Comment";
  if (typeof description !== "undefined" && typeof description !== "string")
    throw "Description must be of string";
  if (!hoursestimated) throw "You must provide a HoursEstimated to add Comment";
  if (
    typeof hoursestimated !== "undefined" &&
    typeof hoursestimated !== "number"
  )
    throw "Hours Estimated must be of number";

  if (typeof completed !== "undefined" && typeof completed !== "boolean")
    throw "Completed must be of number";
  const taskscollection = await tasks();
  const task12 = await taskscollection.findOne({ _id: taskId });
  if (task12 === null) throw "No Tasks found";
  let put = {
    _id: taskId,
    title: title,
    description: description,
    hoursEstimated: hoursestimated,
    completed: completed,
    comments: task12.comments
  };

  const updInfo = await taskscollection.updateOne(
    { _id: taskId },
    { $set: put }
  );
  if (updInfo.modifiedCount == 0) {
    throw "Update Failed";
  }
  const task1 = await getTaskById(taskId);
  return task1;
}

// async function patchTask(
//   taskId,
//   title,
//   description,
//   hoursestimated,
//   completed
// ) {
//   if (!taskId) throw "You must provide a TaskId to add Comment";
//   //   if (!title) throw "You must provide a Title to add Comment";
//   if (typeof title !== "undefined" && typeof title !== "string")
//     throw "Title must be of string";
//   //   if (!description) throw "You must provide a Description to add Comment";
//   if (typeof description !== "undefined" && typeof description !== "string")
//     throw "Description must be of string";
//   //   if (!hoursestimated) throw "You must provide a HoursEstimated to add Comment";
//   if (
//     typeof hoursestimated !== "undefined" &&
//     typeof hoursestimated !== "number"
//   )
//     throw "Hours Estimated must be of number";

//   if (typeof completed !== "undefined" && typeof completed !== "boolean")
//     throw "Completed must be of number";

//   const taskscollection = await tasks();
//   const task12 = await taskscollection.findOne({ _id: taskId });
//   if (task12 === null) throw "No Tasks found";
//   let patch1 = {};
//   if (title) {
//     patch1.title = title;
//   }
//   if (description) {
//     patch1.description = description;
//   }
//   if (hoursEstimated) {
//     patch1.hoursEstimated = hoursEstimated;
//   }
//   if (completed) {
//     patch1.completed = completed;
//   }
//   patch1._id = taskId;
//   patch1.comments = task12.comments;
//   console.log(patch1);

//   let patch = {
//     _id: taskId,
//     title: title,
//     description: description,
//     hoursEstimated: hoursestimated,
//     completed: completed,
//     comments: task12.comments
//   };

//   const updInfo = await taskscollection.updateOne(
//     { _id: taskId },
//     { $set: patch1 }
//   );
//   if (updInfo.modifiedCount == 0) {
//     throw "Update Failed";
//   }
//   const task1 = await getTaskById(taskId);
//   return task1;
// }

async function patchTask(taskId, body) {
  if (!taskId) throw "You must provide a TaskId to add Comment";
  //   if (!title) throw "You must provide a Title to add Comment";
  if (typeof body.title !== "undefined" && typeof body.title !== "string")
    throw "Title must be of string";
  //   if (!description) throw "You must provide a Description to add Comment";
  if (
    typeof body.description !== "undefined" &&
    typeof body.description !== "string"
  )
    throw "Description must be of string";
  //   if (!hoursestimated) throw "You must provide a HoursEstimated to add Comment";
  if (
    typeof body.hoursestimated !== "undefined" &&
    typeof body.hoursestimated !== "number"
  )
    throw "Hours Estimated must be of number";

  if (
    typeof body.completed !== "undefined" &&
    typeof body.completed !== "boolean"
  )
    throw "Completed must be of number";

  const taskscollection = await tasks();
  const task12 = await taskscollection.findOne({ _id: taskId });
  if (task12 === null) throw "No Tasks found";
  let patch1 = {};
  if (body.title) {
    patch1.title = body.title;
  }
  if (body.description) {
    patch1.description = body.description;
  }
  if (body.hoursEstimated) {
    patch1.hoursEstimated = body.hoursEstimated;
  }
  if (body.completed) {
    patch1.completed = body.completed;
  }
  patch1._id = taskId;
  patch1.comments = task12.comments;

  let patch = {
    _id: taskId,
    title: body.title,
    description: body.description,
    hoursEstimated: body.hoursestimated,
    completed: body.completed,
    comments: task12.comments
  };
  //   console.log("PRINTING PATCH" + body);

  const updInfo = await taskscollection.updateOne(
    { _id: taskId },
    { $set: patch1 }
  );
  if (updInfo.modifiedCount == 0) {
    throw "Update Failed";
  }
  const task1 = await getTaskById(taskId);
  return task1;
}

// async function main() {
//   try {
//     const y = await createTask("Hello", "Test", 1, true, [
//       (_id = uuid.v4()),
//       (poster = "Sanam"),
//       (comment = "THIS IS MY COMMENT"),
//       (_id = uuid.v4()),
//       (poster = "Sritam"),
//       (comment = "This is not my content")
//     ]);
//     console.log(y);
//   } catch (e) {
//     console.log(e);
//   }
// }

// main();

module.exports = {
  getAll,
  getTaskById,
  createTask,
  addComment,
  deleteComment,
  putTask,
  patchTask
};
