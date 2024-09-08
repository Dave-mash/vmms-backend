-- CreateTable
CREATE TABLE "user_profile" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "full_name" TEXT NOT NULL DEFAULT '',
    "username" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "active" BOOLEAN NOT NULL,
    "is_email_verified" BOOLEAN,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_uuid_key" ON "user_profile"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_username_key" ON "user_profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_phone_key" ON "user_profile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_email_key" ON "user_profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_password_key" ON "user_profile"("password");
