const db = require("../db/connection");
exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
    const topics = rows;
    return topics;
  });
};
