const db = require ("../helpers/db.helper")


exports.findAllCategories = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "ASC"
    sortBy = sortBy || "id"

    const offset = (page - 1) * limit

    const query = `
  SELECT * FROM "categories" WHERE "name" LIKE $3 ORDER BY "${sortBy}" ${sort} LIMIT $1  OFFSET $2 
    `
    const values = [limit, offset,`%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function(id){
    const query = `
SELECT  * FROM "categories" WHERE id=$1
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByUserId = async function(userId){
    const query = `
SELECT 
"u"."id" AS "userId",
"c"."name",
"c".picture"
FROM "categories" "c"
JOIN 'users" "u" ON "u"."id" = "c"."userId" 
WHERE "c"."userid" =$1
`
    const values = [userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}


exports.insert = async function(data){
    const query = `
INSERT INTO "categories" ("name", "picture") 
VALUES ($1, $2) RETURNING *
`
    const values = [data.name, data.picture]
    const {rows} = await db.query(query, values)
    return rows [0]
}

exports.update = async function (id, data){
    const query = `
    UPDATE "categories"
    SET 
    "name" =$2,
    "picture" =$3
    WHERE "id" =$1
    RETURNING *`

    const values = [id, data.name, data.picture]
    const {rows} = await db.query(query, values)
    return rows [0]
}

exports.destroy = async function(id){
    const query = `
DELETE FROM "categories" WHERE "id"=$1
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows [0]
}

