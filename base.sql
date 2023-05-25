CREATE TABLE "users" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "roleId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "profiles" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "userId" INTEGER,
    "picture" VARCHAR(255),
    "fullName" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "job" VARCHAR(255),
    "about" VARCHAR(255),
    "username" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "categories" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "picture" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);


CREATE TABLE "tags" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);



CREATE TABLE "comments" (
    "id"INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR (255),
    "userId" INTEGER,
    "articleId" INTEGER,
    "content" VARCHAR (255) UNIQUE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updateAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "forgotRequest" (
    "id"INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR (255),
    "code" VARCHAR (255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updateAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "articles" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "title" VARCHAR(255),
    "content" TEXT,
    "createdBy" INTEGER,
    "categoryId" INTEGER,
    "statusId"  INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "likes" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "articleId" INTEGER,
    "userId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "statusArticle" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "status" VARCHAR(10),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

INSERT INTO "statusArticle" ("status") VALUES ('pending'),('posted'),('rejected');

ALTER TABLE "comments" ADD COLUMN "userId" INTEGER;

ALTER TABLE "comments" DROP COLUMN "email";

ALTER TABLE "comments" ADD COLUMN "content" TEXT;
DELETE FROM "likes" WHERE "userId"='1' AND "id"='1' RETURNING *;
