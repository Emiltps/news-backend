const db = require("../db/connection");

exports.dropTables = () => {
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
    });
};

exports.createTables = () => {
  return db
    .query(
      `CREATE TABLE topics (
        slug VARCHAR(200) PRIMARY KEY,
  description VARCHAR(400)  NOT NULL,
  img_url VARCHAR(1000)
  );
  `
    )
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
    });
};
