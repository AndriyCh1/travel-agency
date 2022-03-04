const Guide = require("../models/guide.model")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body.firstName);

  const guide = new Guide({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    experience: req.body.experience,
    about: req.body.about
  });

  Guide.create(guide, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Guide."
      });
    else res.send(data);
  });
}


exports.findOne = (req, res) => {
  Guide.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Guide with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Guide with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


exports.findAll = (req, res) => {
  Guide.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving guides."
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

  Guide.updateById(
    req.params.id,
    new Guide(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Guide with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Guide with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}

exports.deleteById = (req, res) => {
  Guide.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found guide with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete guide with id " + req.params.id
        });
      }
    } else res.send({ message: `Guide was deleted successfully!` });
  });
};