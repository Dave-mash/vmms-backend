-- CreateTable
CREATE TABLE "vm_audit_log" (
    "id" SERIAL NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "activity_type" TEXT NOT NULL DEFAULT '',
    "link_user" TEXT NOT NULL DEFAULT '',
    "link_org" TEXT NOT NULL DEFAULT '',
    "link_instance" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vm_audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "tsid" TEXT NOT NULL DEFAULT '',
    "payment_type" TEXT NOT NULL DEFAULT '',
    "link_user" TEXT NOT NULL DEFAULT '',
    "link_organisation" TEXT NOT NULL DEFAULT '',
    "transaction_ref_no" TEXT NOT NULL DEFAULT '',
    "receiver_bank_code" TEXT NOT NULL DEFAULT '',
    "receiver_account_full_name" TEXT NOT NULL DEFAULT '',
    "receiver_account_no" TEXT NOT NULL DEFAULT '',
    "sender_name" TEXT NOT NULL DEFAULT '',
    "sender_account_no" TEXT NOT NULL DEFAULT '',
    "narration" TEXT NOT NULL DEFAULT '',
    "tranCCY" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);
