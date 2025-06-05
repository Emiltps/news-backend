const db = require("../db/connection");
exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    const topics = rows;
    return topics;
  });
};
