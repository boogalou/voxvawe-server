import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDialog1687546978033 implements MigrationInterface {
    name = 'UpdateDialog1687546978033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "isGroup" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "dialogs" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ALTER COLUMN "interlocutorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ALTER COLUMN "interlocutorName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" ALTER COLUMN "interlocutorName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ALTER COLUMN "interlocutorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "isGroup"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "role"`);
    }

}
