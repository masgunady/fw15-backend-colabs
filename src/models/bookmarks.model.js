const db = require("../helpers/db.helper")

exports.findByUserId = async function (id) {
    const query = `
    SELECT 
    "a"."picture",
    "a"."id",
    "b"."id" AS "bookmarkId",
    "a"."title",
    "a"."content",
    "p"."fullName" AS "author",
    "rl"."name" AS "role",
    "p"."userId" AS "authorId",
	"c"."name" AS "category",
    COUNT("li"."id")::INTEGER AS "likeCount",
    "a"."createdAt",
    "a"."updatedAt"
    FROM 
        "bookmarks" "b"
    LEFT JOIN "articles" "a" ON "a"."id" = "b"."articleId"
    LEFT JOIN 
        "categories" AS "c" ON "c"."id" = "a"."categoryId"
    LEFT JOIN 
        "profiles" AS "p" ON "p"."userId" = "a"."createdBy"
    LEFT JOIN 
        "likes" AS "li" ON "li"."articleId" = "a"."id"
    LEFT JOIN 
        "bookmarks" AS "bo" ON "bo"."articleId" = "a"."id"
    LEFT JOIN 
        "users" AS "u" ON "u"."id" = "p"."userId"
    LEFT JOIN 
        "role" AS "rl" ON "rl"."id" = "u"."roleId"
        WHERE "b"."userId" = $1
    GROUP BY 
        "a"."picture",
        "a"."id",
        "b"."id",
        "a"."title",
        "a"."content",
        "p"."fullName",
        "rl"."name",
        "p"."userId",
        "c"."name",
        "a"."createdAt",
        "a"."updatedAt"

  `
    // console.log(query)
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "bookmarks" (
      "articleId",
      "userId"
      )
    VALUES ($1, $2) RETURNING *
    `
    const values = [
        data.articleId,
        data.userId
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.insertBookmarkedArticle = async function (data) {
    const query = `
    INSERT INTO "bookmarks" ("userId", "articleId") 
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.userId, data.articleId]
    const { rows } = await db.query(query, values)
    return rows[0]
}


exports.findOneByUserIdAndArticleId = async(userId, articleId) => {
    const query = `
    SELECT * FROM "bookmarks" WHERE "userId" = $1 AND "articleId" =  $2
    `
    const values = [userId, articleId]
    const {rows} = await db.query(query, values)
    return rows[0]
}


exports.deleteByUserIdAndArticleId = async(userId, articleId) => {
    const query = `
    DELETE FROM "bookmarks" WHERE "userId" = $1 AND "articleId" =  $2 RETURNING *
    `
    const values = [userId, articleId]
    const {rows} = await db.query(query, values)
    return rows[0]

}
