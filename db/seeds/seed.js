const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate } = require("../seeds/utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query("DROP TABLE IF EXISTS comments")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics");
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
        slug VARCHAR(200) PRIMARY KEY,
  description VARCHAR(400)  NOT NULL,
  img_url VARCHAR(1000)
  );
  `);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users (
      username VARCHAR(200) PRIMARY KEY,
      NAME VARCHAR(200),
      avatar_url VARCHAR(1000)
      );
      `
      );
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY  KEY,
  title VARCHAR(400)  NOT NULL,
  topic VARCHAR(200) REFERENCES topics(slug),
  author VARCHAR(300) REFERENCES users(username),
  body TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  votes INT DEFAULT 0,
  article_img_url VARCHAR(1000)

  );
  `);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id),
        body TEXT,
        votes INT DEFAULT 0,
        author VARCHAR(300) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `);
    })
    .then(() => {
      const formattedTopics = topicData.map(
        ({ description, slug, img_url }) => [description, slug, img_url]
      );
      const insertTopics = format(
        `INSERT INTO topics (description,slug,img_url) VALUES %L;`,
        formattedTopics
      );
      return db.query(insertTopics);
    })
    .then(() => {
      const formattedUsers = userData.map(({ username, name, avatar_url }) => [
        username,
        name,
        avatar_url,
      ]);
      const insertUsers = format(
        `INSERT INTO users (username,name,avatar_url) VALUES %L;`,
        formattedUsers
      );
      return db.query(insertUsers);
    })
    .then(() => {
      const formattedArticles = articleData
        .map(convertTimestampToDate)
        .map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            votes,
            article_img_url,
          }) => [title, topic, author, body, created_at, votes, article_img_url]
        );
      const insertArticles = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L;`,
        formattedArticles
      );
      console.log(insertArticles);
      return db.query(insertArticles);
    });
};
module.exports = seed;
