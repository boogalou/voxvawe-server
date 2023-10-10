import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageEntity1688146078077 implements MigrationInterface {
    name = 'UpdateMessageEntity1688146078077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "is_read"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sent_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "edit_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipient_id"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "is_delivered"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipientId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "isDelivered" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "isRead" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "sentAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "editAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "editAt"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sentAt"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "isRead"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "isDelivered"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipientId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "is_delivered" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipient_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "edit_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "sent_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "is_read" boolean NOT NULL DEFAULT false`);
    }

}
