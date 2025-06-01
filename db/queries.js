const db = require("../db/connection");
function logAllUsers() {
  return db
    .query(`SELECT * FROM users;`)
    .then((res) => {
      console.log(res.rows, "<<All users");
    })
    .finally(() => {
      db.end();
    });
}
function logArticlesTopicCoding() {
  db.query(
    `SELECT * FROM articles
    WHERE articles.topic = 'coding';`
  )
    .then((res) => {
      console.log(res.rows, "<<Articles with topic coding");
    })
    .finally(() => {
      db.end();
    });
}

function logCommentsWithLessThanZero() {
  db.query(
    `SELECT * FROM comments
    WHERE comments.votes < 0;`
  )
    .then((res) => {
      console.log(res.rows, "<<Comments with less than 0 votes");
    })
    .finally(() => {
      db.end();
    });
}
function logAllTopics() {
  return db
    .query(`SELECT * FROM topics;`)
    .then((res) => {
      console.log(res.rows, "<<All topics");
    })
    .finally(() => {
      db.end();
    });
}
function getArticlesByGrumpy19() {
  return db
    .query(
      `SELECT * FROM articles
    WHERE articles.author ='grumpy19';`
    )
    .then((res) => {
      console.log(res.rows, "<<Articles from grump19");
    })
    .finally(() => {
      db.end();
    });
}
function getCommentsWithMore10() {
  return db
    .query(
      `SELECT * FROM comments
    WHERE comments.votes >10;`
    )
    .then((res) => {
      console.log(res.rows, "<<Comments with more than 10 votes");
    })
    .finally(() => {
      db.end();
    });
}
getCommentsWithMore10();
