const db = require("../helpers/db.helper")

// exports.findAllComments = async function (page, limit, search, sort, sortBy, articleId) {
//     page = parseInt(page) || 1
//     limit = parseInt(limit) || 5
//     search = search || ""
//     sort = sort || "id"
//     sortBy = sortBy || "ASC"
//     articleId = articleId || ""

//     const offset = (page - 1) * limit

//     const query = `
//     SELECT c.*, "p"."fullName", "p"."picture"
//     FROM "bookmarks" c
//     JOIN "profiles" "p" ON "c"."userId" = "p"."userId"
//     WHERE "p"."fullName" LIKE $3 AND "c"."articleId" LIKE $4
//     ORDER BY "${sort}" ${sortBy} LIMIT $1  OFFSET $2 
//     `
//     const values = [limit, offset, `%${search}%`, articleId]
//     const { rows } = await db.query(query, values)
//     return rows
// }

// exports.findOne = async function (userId) {
//     const query = `
//     SELECT c.*, "p"."username" AS "username", "p"."picture" AS "picture"
//     FROM "bookmarks" c
//     JOIN "profiles" "p" ON "c"."userId" = "p"."userId"
//     WHERE "c".id = $1
// `
//     const values = [userId]
//     const { rows } = await db.query(query, values)
//     return rows[0]
// }
// exports.findByArticle = async function (articleId) {
//     const query = `
//     SELECT 
//     "p"."picture",
//     "p"."fullName" as "username",
//     "c"."content" as "comment"
//     FROM "bookmarks" c
//     JOIN "profiles" "p" ON "c"."userId" = "p"."userId"
//     WHERE "c"."articleId"= $1
// `
//     const values = [articleId]
//     const { rows } = await db.query(query, values)
//     return rows
// }

exports.findByUser = async function (userId, params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) ||20
    params.sort = params.sort || "DESC"
    params.sortBy = params.sortBy || "createdAt"

    const offset = (params.page - 1) * params.limit
    const query = `
    SELECT 
    "bo"."articleId",
    "bo"."userId",
    "a"."picture",
    "a"."title",
    "a"."content",
    COUNT("li"."id")::INTEGER AS "likeCount",
    "a"."createdAt"
    FROM "bookmarks" "bo"
    LEFT JOIN 
        "articles" AS "a" ON "a"."id" = "bo"."articleId"
    LEFT JOIN 
        "likes" AS "li" ON "li"."articleId" = "bo"."articleId"
    WHERE "bo"."userId"= $1 
    GROUP BY
        "bo"."userId",
        "bo"."articleId",
        "a"."picture",
        "a"."title",
        "a"."content",
        "a"."createdAt"
    ORDER BY "${params.sortBy}" ${params.sort}
    LIMIT ${params.limit} OFFSET ${offset}
    `
    const values = [userId]
    const { rows } = await db.query(query, values)
    return rows
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

// exports.destroy = async function (id) {
//     const query = `
// DELETE FROM "bookmarks" WHERE "id"=$1
// `
//     const values = [id]
//     const { rows } = await db.query(query, values)
//     return rows[0]
// }
