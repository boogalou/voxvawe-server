import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageEntity1687735975334 implements MigrationInterface {
    name = 'UpdateMessageEntity1687735975334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "content" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipient_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "is_delivered" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "is_delivered"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipient_id"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "body" character varying NOT NULL`);
    }

}
