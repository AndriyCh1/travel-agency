const Tour = require("../models/tour.model")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const tour = new Tour({
    categoryId:  req.body.categoryId,
    name: req.body.name,
    price: req.body.price,
    duration: req.body.duration,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    description: req.body.description,
  });
  
  Tour.create(tour, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tour."
      });
    else res.send(data);
  });
}


exports.findOne = (req, res) => {
  Tour.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tour with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tour with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


exports.findAll = (req, res) => {
  Tour.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tours."
      });
    else res.send(data);
  });
};


exports.updateById = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Tour.updateById(
    req.params.id,
    new Tour(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tour with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tour with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}

exports.deleteById = (req, res) => {
  Tour.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tour with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete tour with id " + req.params.id
        });
      }
    } else res.send({ message: `Tour was deleted successfully!` });
  });
};



exports.addGuide = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Tour.addGuide(req.body.tourId, req.body.guideId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred"
      });
    else res.send(data);
  });
}

exports.deleteGuide = (req, res) => {
  Tour.removeGuide(req.body.tourId, req.body.guideId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete "
        });
      }
    } else res.send({ message: `Deleted successfully!` });
  });
};

exports.findGuidesByTour = (req, res) => {
  Tour.getAllGuidesByTour(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tours."
      });
    else res.send(data);
  });
};
