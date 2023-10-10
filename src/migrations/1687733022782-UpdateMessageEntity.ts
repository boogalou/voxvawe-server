import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageEntity1687733022782 implements MigrationInterface {
    name = 'UpdateMessageEntity1687733022782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipient"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "isRead"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sentAt"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "editAt"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "is_read" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "sent_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "edit_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "edit_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sent_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "is_read"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "editAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "sentAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "isRead" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipient" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "author" character varying NOT NULL`);
    }

}
