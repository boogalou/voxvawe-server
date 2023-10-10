import { MigrationInterface, QueryRunner } from "typeorm";

export class MessageEntityUpdate1688416059327 implements MigrationInterface {
    name = 'MessageEntityUpdate1688416059327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "senderId" TO "account_id"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "account_id" character varying`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_d61d1bec4a104d044b6e5abd843" FOREIGN KEY ("account_id") REFERENCES "users"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_d61d1bec4a104d044b6e5abd843"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "account_id" integer`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "account_id" TO "senderId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
