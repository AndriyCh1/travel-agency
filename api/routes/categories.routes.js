module.exports = app => {
  const categories = require("../controllers/categories.contoller");

  var router = require("express").Router();

  router.post("/", categories.create);

  router.get("/", categories.findAll);

  router.get("/:id", categories.findOne);

  router.put("/:id", categories.updateById);

  router.delete("/:id", categories.deleteById);

  app.use('/categories', router);
};

