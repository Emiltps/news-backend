const db = require("../../db/connection");

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
