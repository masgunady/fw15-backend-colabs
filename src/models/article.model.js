const db = require("../helpers/db.helper")
const table = "articles"

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 5
    params.searchName = params.searchName || ""
    params.searchCategory = params.searchCategory || ""
    params.searchLocation = params.searchLocation || ""
    params.sort = params.sort || "ASC"
    params.sortBy = params.sortBy || "id"

    const offset = (params.page - 1) * params.limit
    
    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "${table}"
    WHERE "title" LIKE $1 
    `
    const countValues = [`%${params.searchName}%` ]
    console.log(countValues)
    const {rows: countRows} = await db.query(countQuery, countValues)

    const query = `
    SELECT "picture", "id", "title", left("content", 100), "createdBy", "createdAt", "updatedAt" 
    FROM "${table}"
    WHERE "title" LIKE $1 
    ORDER BY "${params.sortBy}" ${params.sort}
    LIMIT ${params.limit} OFFSET ${offset}
    `
    console.log(query)
    const values = [`%${params.searchName}%` ]
    const { rows } = await db.query(query, values)
    return {rows, pageInfo: {
        totaData: countRows[0].count,
        page: params.page,
        limit: params.limit,
        totalPage: Math.ceil(countRows[0].count / params.limit)
    }}
}

exports.findOne = async function (id) {
    const query = `
  SELECT "picture", "id", "title", left("content", 100), "createdBy", "createdAt", "updatedAt" 
  FROM "${table}"
  WHERE "id" = $1
  `
    console.log(query)
    const values = [id]
    const { rows } = await db.query(query, values)
    return {rows}
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
    ("picture", "title", "content", "createdBy", "categoryId", "statusId")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const values = [data.picture, data.title, data.content, data.createdBy, data.categoryId, data.statusId]
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
