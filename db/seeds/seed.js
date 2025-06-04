const db = require("../connection");
const format = require("pg-format");
const {
  convertTimestampToDate,
  createLookupObject,
} = require("../seeds/utils");
const { dropTables, createTables } = require("../manage-tables");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return dropTables()
    .then(() => {
      return createTables();
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
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;`,
        formattedArticles
      );
      return db.query(insertArticles);
    })
    .then((res) => {
      const articleIdLookup = createLookupObject(
        res.rows,
        "author",
        "article_id"
      );
      const formatedComments = commentData
        .map(convertTimestampToDate)
        .map(({ body, votes, author, created_at }) => [
          body,
          votes,
          author,
          created_at,
          articleIdLookup[author],
        ]);
      const insertComments = format(
        `INSERT INTO comments (body, votes, author, created_at, article_id) VALUES %L;`,
        formatedComments
      );
      return db.query(insertComments);
    });
};
module.exports = seed;
