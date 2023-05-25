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
    "email" VARCHAR (255) UNIQUE,
    "articleId" INTEGER,
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
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

ALTER TABLE "comments" ADD COLUMN "userId" INTEGER;

ALTER TABLE "comments" DROP COLUMN "email";

ALTER TABLE "comments" ADD COLUMN "content" TEXT;
