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
