/*
  Warnings:

  - A unique constraint covering the columns `[initiator_id,receiver_id]` on the table `Exchange` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exchange_initiator_id_receiver_id_key" ON "Exchange"("initiator_id", "receiver_id");
