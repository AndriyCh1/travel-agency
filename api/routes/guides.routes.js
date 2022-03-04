module.exports = app => {
  const guides = require("../controllers/guides.contoller");

  var router = require("express").Router();

  router.post("/", guides.create);

  router.get("/", guides.findAll);

  router.get("/:id", guides.findOne);
  
  router.put("/:id", guides.updateById);

  router.delete("/:id", guides.deleteById);
  
  app.use('/guides', router);
};
