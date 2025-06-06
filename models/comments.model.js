const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

exports.fetchCommentsByArticleId = async (article_id) => {
  await checkExists("articles", "article_id", article_id);

  const result = await db.query(
    `SELECT comment_id, votes, created_at, author, body ,article_id 
        FROM comments 
        WHERE article_id = $1
        ORDER BY created_at DESC`,
    [article_id]
  );
  return result.rows;
};
