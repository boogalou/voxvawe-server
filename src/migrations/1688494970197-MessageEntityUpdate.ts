import { MigrationInterface, QueryRunner } from "typeorm";

export class MessageEntityUpdate1688494970197 implements MigrationInterface {
    name = 'MessageEntityUpdate1688494970197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_d61d1bec4a104d044b6e5abd843"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "account_id" TO "sender_id"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_22133395bd13b970ccd0c34ab22" FOREIGN KEY ("sender_id") REFERENCES "users"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_22133395bd13b970ccd0c34ab22"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "sender_id" TO "account_id"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_d61d1bec4a104d044b6e5abd843" FOREIGN KEY ("account_id") REFERENCES "users"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
