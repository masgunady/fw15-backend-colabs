const db = require("../helpers/db.helper")
const table = "article"

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 7
    params.searchName = params.searchName || ""
    params.searchCategory = params.searchCategory || ""
    params.searchLocation = params.searchLocation || ""
    params.sort = params.sort || "id"
    params.sortBy = params.sortBy || ""

    const offset = (params.page - 1) * params.limit

    const query = `
    SELECT 
    "e"."id", 
    "e"."picture", 
    "e"."title", 
    "e"."date", 
    "c"."name" as "category",
    "ci"."name" as "location" 
    FROM "eventCategories" "ec"
    JOIN "article" "e" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    WHERE "e"."title" LIKE $3 AND "c"."name" LIKE $4 AND "ci"."name" LIKE $5
    ORDER BY "${params.sort}" ${params.sortBy}
    LIMIT $1 OFFSET $2
    `
    const values = [params.limit, offset, `%${params.searchName}%`, `%${params.searchCategory}%`, `%${params.searchLocation}%`]
    const { rows } = await db.query(query, values)
    return rows
}

exports.findOneById = async function (id) {
    const query = `
    SELECT
    "e"."id", 
    "e"."picture", 
    "e"."title", 
    "e"."date", 
    "c"."name" as "category",
    "ci"."name" as "location", 
    "e"."descriptions" 
    FROM "eventCategories" "ec"
    JOIN "article" "e" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    WHERE "e"."id" = $1
  `
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}

//manage event
exports.findDetailManageArticle = async function (eventId, createdBy) {
    const query = `
  SELECT * FROM "${table}" WHERE "id" = $1 AND "createdBy" = $2
  `
    const values = [eventId, createdBy]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.findAllManageArticle = async function (createdBy) {

    const query = `
  SELECT * FROM "${table}" 
  WHERE "createdBy" = $1
  `
    const values = [createdBy]
    const { rows } = await db.query(query, values)
    return rows
}

exports.createManageArticle = async function (data) {
    const query = `
    INSERT INTO "${table}"
    ("picture", "title", "content")
    VALUES ($1, $2, $3, $4) RETURNING *
    `
    const values = [data.picture, data.title, data.content]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.updateManageArticle = async function (id, data) {
    const query = `
  UPDATE "${table}" SET
  "picture" = COALESCE(NULLIF($2, ''), "picture"),
  "title" = COALESCE(NULLIF($3, ''), "title"),    
  "content" = COALESCE(NULLIF($4::DATE, NULL), "date")
    WHERE "id" = $1 
  RETURNING *
  `
    const values = [id, data.picture, data.content]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "${table}" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.destroyByIdAndUserId = async function (id, createdBy) {
    const query = `
  DELETE FROM "${table}" WHERE "id"=$1 AND "createdBy" = $2 RETURNING *
`
    const values = [id, createdBy]
    const { rows } = await db.query(query, values)
    return rows[0]
}
