const db = require("../helpers/db.helper")

exports.insertByUser = async function (data, userId) {
    const query = `
    INSERT INTO "likes" ("articleId", "userId") 
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.articleId, userId]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.findByUserIdAndArticleId = async(userId, articleId) => {
    const query = `
    SELECT * FROM "likes" WHERE "userId" = $1 AND "articleId" =  $2
    `
    const values = [userId, articleId]
    const {rows} = await db.query(query, values)
    return rows
}
exports.findOneByUserIdAndArticleId = async(userId, articleId) => {
    const query = `
    SELECT * FROM "likes" WHERE "userId" = $1 AND "articleId" =  $2
    `
    const values = [userId, articleId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroyArticleByUser = async function (userId, id) {
    const query = `
    DELETE FROM "likes" 
    WHERE "userId"=$1 AND "id"=$2
    RETURNING *
    `
    const values = [userId, id]
    const { rows } = await db.query(query, values)
    return rows[0]
}
