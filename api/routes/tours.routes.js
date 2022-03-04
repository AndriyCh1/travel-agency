module.exports = app => {
  const tours = require("../controllers/tours.contoller");

  var router = require("express").Router();

  router.post("/", tours.create);

  router.post("/guide", tours.addGuide);

  router.delete("/guide", tours.deleteGuide);

  router.get("/", tours.findAll);

  router.get("/:id", tours.findOne);

  router.get("/:id/guides", tours.findGuidesByTour);
  
  router.put("/:id", tours.updateById);

  router.delete("/:id", tours.deleteById);
  
  app.use('/tours', router);
};
