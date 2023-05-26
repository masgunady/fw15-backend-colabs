const db = require("../helpers/db.helper")

exports.findAllComments = async function (page, limit, search, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = `
    SELECT c.*, "p"."username" AS "username", "p"."picture" AS "picture"
    FROM "comments" c
    JOIN "profiles" "p" ON "c"."userId" = "p"."userId"
  WHERE "name" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1  OFFSET $2 
  `
    const values = [limit, offset, `%${search}%`]
    const { rows } = await db.query(query, values)
    return rows
}

exports.findOne = async function (userId) {
    const query = `
    SELECT c.*, "p"."username" AS "username", "p"."picture" AS "picture"
    FROM "comments" c
    JOIN "profiles" "p" ON "c"."userId" = "p"."userId"
    WHERE "c".id = $1
`
    const values = [userId]
    const { rows } = await db.query(query, values)
    return rows[0]
}
exports.findByArticle = async function (articleId) {
    const query = `
    SELECT 
    "p"."picture",
    "p"."fullName" as "username",
    "c"."content" as "comment"
    FROM "comments" c
    JOIN "profiles" "p" ON "c"."userId" = "p"."userId"
    WHERE "c"."articleId"= $1
`
    const values = [articleId]
    const { rows } = await db.query(query, values)
    return rows
}

exports.insert = async function (data) {
    const query = `
INSERT INTO "comments" ("name", "userId", "articleId", "content") 
VALUES ($1, $2, $3, $4) RETURNING *
`
    const values = [data.name, data.userId, data.articleId, data.content]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
DELETE FROM "comments" WHERE "id"=$1
`
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}
