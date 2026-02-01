-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charger" (
    "id" TEXT NOT NULL,
    "host_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "price_per_hour" INTEGER NOT NULL,
    "charger_type" TEXT NOT NULL,
    "photo_url" TEXT,
    "available_start" TEXT NOT NULL,
    "available_end" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Charger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "charger_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Charger" ADD CONSTRAINT "Charger_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_charger_id_fkey" FOREIGN KEY ("charger_id") REFERENCES "Charger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
