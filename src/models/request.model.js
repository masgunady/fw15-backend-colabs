const db = require("../helpers/db.helper")

exports.findAll = async(params) => {

    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 100
    params.searchName = params.searchName || ""
    params.category = params.category || ""
    params.searchCategory = params.searchCategory || ""
    params.searchLocation = params.searchLocation || ""
    params.sort = params.sort || "DESC"
    params.sortBy = params.sortBy || "id"
    const offset = (params.page - 1) * params.limit
    const query = `
    SELECT
    "n"."id",
    "u"."id" AS "senderId",
    "p"."picture",
    "p"."fullName",
    "a"."id" AS "articleId",
    "n"."typeRequest",
    "n"."message",
    "n"."statusRequest",
    "n"."createdAt",
    "n"."updatedAt"
    FROM "notifications" "n"
    LEFT JOIN "users" "u" ON "u"."id" = "n"."senderId"
    LEFT JOIN "profiles" "p" ON "p"."userId" = "u"."id"
    LEFT JOIN "articles" "a" ON "a"."id" = "n"."articleId"
    WHERE "n"."statusRequest" = 1 AND "senderId" != '${params.id}' AND ("recipientRole" = 'superadmin' OR "recipientId" = '${params.id}')
    ORDER BY "${params.sortBy}" ${params.sort}
    LIMIT ${params.limit} OFFSET ${offset}
    `
    const {rows} = await db.query(query)
    return rows
}

exports.findAllNotifUser = async(params) => {

    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 100
    params.searchName = params.searchName || ""
    params.category = params.category || ""
    params.searchCategory = params.searchCategory || ""
    params.searchLocation = params.searchLocation || ""
    params.sort = params.sort || "DESC"
    params.sortBy = params.sortBy || "id"
    const offset = (params.page - 1) * params.limit
    const query = `
    SELECT
    "n"."id",
    "u"."id" AS "senderId",
    "p"."picture",
    "p"."fullName",
    "a"."id" AS "articleId",
    "n"."typeRequest",
    "n"."message",
    "n"."statusRequest",
    "n"."createdAt",
    "n"."updatedAt"
    FROM "notifications" "n"
    LEFT JOIN "users" "u" ON "u"."id" = "n"."senderId"
    LEFT JOIN "profiles" "p" ON "p"."userId" = "u"."id"
    LEFT JOIN "articles" "a" ON "a"."id" = "n"."articleId"
    WHERE "n"."statusRequest" = 1 AND "recipientId" = '${params.id}' AND "senderId" <> '${params.id}'
    ORDER BY "${params.sortBy}" ${params.sort}
    LIMIT ${params.limit} OFFSET ${offset}
    `
    const {rows} = await db.query(query)
    return rows
}

exports.checkDuplicate = async(params) => {   
    const query = `
    SELECT
    "n"."id",
    "u"."id" AS "senderId",
    "p"."picture",
    "p"."fullName",
    "a"."id" AS "articleId",
    "n"."typeRequest",
    "n"."message",
    "n"."statusRequest",
    "n"."createdAt",
    "n"."updatedAt"
    FROM "notifications" "n"
    LEFT JOIN "users" "u" ON "u"."id" = "n"."senderId"
    LEFT JOIN "profiles" "p" ON "p"."userId" = "u"."id"
    LEFT JOIN "articles" "a" ON "a"."id" = "n"."articleId"
    WHERE "n"."senderId" = $1 AND "n"."typeRequest" = $2 AND "n"."statusRequest" = $3
    `
    const values = [params.senderId, params.typeRequest, params.statusRequest]
    const {rows} = await db.query(query, values)
    return rows[0]

}
exports.findOneByArticleData = async(params) => {
    const query = `
    SELECT * FROM "notifications"
    WHERE "articleId" = $1 AND "senderId" = $2 AND "typeRequest" = $3 AND "statusRequest" = $4
    `
    const values = [params.articleId ,params.senderId, params.typeRequest, params.statusRequest]
    const {rows} = await db.query(query, values)
    return rows[0]

}


exports.insertNotification = async(data) => {
    const query = `
    INSERT INTO "notifications" ("articleId","senderId","message","typeRequest","statusRequest","recipientId")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const values = [data.articleId,data.senderId, data.message,data.typeRequest, data.statusRequest, data.recipientId]
    const {rows} = await db.query(query, values)
    return rows[0]
}


exports.insertRequestAuthor = async(data) => {
    const query = `
    INSERT INTO "notifications" ("senderId","message","typeRequest","statusRequest","recipientId", "recipientRole")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const values = [data.senderId, data.message,data.typeRequest, data.statusRequest, data.recipientId, data.recipientRole]
    const {rows} = await db.query(query, values)
    return rows[0]
}


exports.insertRequestArticle = async(data) => {
    const query = `
    INSERT INTO "notifications" ("articleId","senderId","message","typeRequest","statusRequest","recipientId", "recipientRole")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `
    const values = [data.articleId,data.senderId, data.message,data.typeRequest, data.statusRequest, data.recipientId, data.recipientRole]
    const {rows} = await db.query(query, values)
    return rows[0]
}


exports.changeStatusRequest = async(id) => {
    const query = `
    DELETE FROM "notifications" WHERE "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.deleteRequestArticle = async() => {
    const query = `
    DELETE FROM "notifications" WHERE "typeRequest" = 'article' AND "statusRequest" = 1
    RETURNING *
    `
    const {rows} = await db.query(query)
    return rows[0]
}

exports.deleteRequestBookmark = async(data) => {
    const query = `
    DELETE FROM "notifications" WHERE "senderId" = $1 AND "articleId" = $2 AND "typeRequest" = $3
    RETURNING *
    `
    const values = [data.senderId, data.articleId, data.typeRequest]
    const {rows} = await db.query(query, values)
    return rows[0]
}

// exports.changeStatusRequest = async(id) => {
//     const query = `
//     UPDATE "notifications" SET "statusRequest" = 0 WHERE "id" = $1
//     RETURNING *
//     `
//     const values = [id]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }
