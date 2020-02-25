const storeRoutes = require("./store");
const path = require("path");

const constructorMethod = app => {
  app.use("/", storeRoutes);

  app.use("*", (req, res) => {
    // res.sendStatus(404);
    res.sendFile(path.resolve("./views/store/error.html"));
  });
};

module.exports = constructorMethod;
