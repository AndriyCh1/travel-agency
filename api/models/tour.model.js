const db = require("./db.js");

const Tour = function(tour){
  this.category_id = tour.categoryId;
  this.name = tour.name;
  this.price = tour.price;
  this.duration = tour.duration;
  this.date_start = tour.dateStart;
  this.date_end = tour.dateEnd;
  this.description = tour.description;
}

Tour.create = (newTour, result) => {
  if(+newTour.categoryId === 0) {
    return;
  }

  db.query("INSERT INTO tours SET ?", newTour, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newTour });
  })
}


Tour.findById = (id, result) => {
  db.query(`SELECT * FROM tours WHERE tour_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tour: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Tour.getAll = (result) => {
  db.query("SELECT * FROM tours", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Tour.updateById = (id, tour, result) => {
  db.query(
    `UPDATE tours SET category_id = ?, name = ?, price = ? , duration = ?, date_start = ?, date_end = ?, description= ? WHERE tour_id= ?`, 
    [tour.category_id, tour.name, tour.price, tour.duration, tour.date_start, tour.date_end, tour.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tour: ", { id: id, ...tour });
      result(null, { id: id, ...tour });
    }
  );
}

Tour.remove = (id, result) => {
  db.query("DELETE FROM tours WHERE tour_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tour with id: ", id);
    result(null, res);
  });
};


Tour.addGuide = (tourId, guideId, result) => {
  db.query("INSERT INTO tours_guides VALUES (?, ?)", [tourId, guideId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created: ", {tour_id: tourId, guide_id: guideId});
    result(null, {tour_id: tourId, guide_id: guideId});
  })
}

Tour.removeGuide = (tourId, guideId, result) => {
  db.query("DELETE FROM tours_guides WHERE tours_guides.tour_id = ? AND tours_guides.guide_id = ?", [tourId, guideId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted with id: ", tourId);
    result(null, res);
  });
}

Tour.getAllGuidesByTour = (tourId, result) => {
  db.query("SELECT * FROM guides INNER JOIN tours_guides ON guides.guide_id = tours_guides.guide_id WHERE tours_guides.tour_id = ?", tourId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Tour;