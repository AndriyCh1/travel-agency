const db = require("./db.js");

const Guide = function(guide){
  this.first_name = guide.firstName
  this.last_name = guide.lastName;
  this.age = guide.age;
  this.experience = guide.experience;
  this.about = guide.about;

}

Guide.create = (newGuide, result) => {
   db.query("INSERT INTO guides SET ?", newGuide, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created guide: ", { id: res.insertId, ...newGuide });
    result(null, { id: res.insertId, ...newGuide });
  })
}


Guide.findById = (id, result) => {
  db.query(`SELECT * FROM guides WHERE guide_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found guide: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Guide.getAll = (result) => {
  db.query("SELECT * FROM guides", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("guides: ", res);
    result(null, res);
  });
};

Guide.updateById = (id, guide, result) => {
  console.log(guide, " guide ", id, " id ");
  db.query(
    "UPDATE guides SET first_name = ?, last_name = ?, age = ? , experience = ?, about = ? WHERE guide_id= ?", 
    [guide.first_name, guide.last_name, guide.age, guide.experience, guide.about, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated guide: ", { id: id, ...guide });
      result(null, { id: id, ...guide });
    }
  );
}

Guide.remove = (id, result) => {
  db.query("DELETE FROM guides WHERE guide_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted guide with id: ", id);
    result(null, res);
  });
};

module.exports = Guide;