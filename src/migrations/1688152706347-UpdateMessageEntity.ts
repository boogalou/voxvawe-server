import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageEntity1688152706347 implements MigrationInterface {
    name = 'UpdateMessageEntity1688152706347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipientId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipientId" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "sentAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "sentAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipientId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipientId" integer NOT NULL`);
    }

}
