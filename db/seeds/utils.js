const db = require("../../db/connection");
const format = require("pg-format");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

// Find the article ID  given that we know the author using the articles table
exports.createLookupObject = (array, key, value) => {
  const lookupObject = {};
  array.forEach((element) => {
    lookupObject[element[key]] = element[value];
  });
  return lookupObject;
};

exports.checkExists = async (table, column, value) => {
  const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);
  const result = await db.query(queryStr, [value]);

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
};
