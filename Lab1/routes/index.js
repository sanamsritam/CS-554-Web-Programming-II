const taskRoutes = require("./tasks");

const constructorMethod = app => {
  app.use("/api/tasks", taskRoutes);
  // app.use("/animals", animalRoutes);
  // app.use("/likes", likeRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not Found" });
  });
};

module.exports = constructorMethod;
