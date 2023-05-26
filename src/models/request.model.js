const db = require("../helpers/db.helper")

exports.insertRequestArticle = async (data) =>{
    const query = `
    INSERT INTO "requestArticle" ("articleId", "userId","message","typeRequest","statusRequest")
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `

    const values = [data.articleId, data.userId, data.message, data.typeRequest, data.statusRequest]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findAll = async() => {

    // params.page = parseInt(params.page) || 1
    // params.limit = parseInt(params.limit) || 10
    // const offset = (params.page - 1) * params.limit
    // params.sort = params.sort || "ASC"
    // params.sortBy = params.sortBy || "\ra.id""\id"
    const query = `
    SELECT
    "ra"."id",
   "u"."id" AS "userId",
    "p"."picture",
    "p"."fullName",
    "ra"."typeRequest",
    "ra"."message",
    "ra"."statusRequest"
    FROM "requestArticle" "ra"
    JOIN "users" "u" ON "u"."id" = "ra"."userId"
    JOIN "profiles" "p" ON "p"."userId" = "u"."id"
    `
    // ORDER BY "${params.sort}" ${params.sortBy} 
    // LIMIT $1 OFFSET $2
    // const values = [params.limit, offset]
    const {rows} = await db.query(query)
    return rows

}

exports.insertRequestAuthor = async(data) => {
    const query = `
    INSERT INTO "requestArticle" ("userId","message","typeRequest","statusRequest")
    VALUES ($1, $2, $3, $4) RETURNING *
    `

    const values = [data.userId, data.message,data.typeRequest, data.statusRequest]
    const {rows} = await db.query(query, values)
    return rows[0]
}



exports.changeStatusRequest = async(id) => {
    const query = `
    UPDATE "requestArticle" SET "statusRequest" = 0 WHERE "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
