import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDialogThree1687599315860 implements MigrationInterface {
    name = 'UpdateDialogThree1687599315860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutorId"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "isGroup"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "is_group" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "is_group"`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "isGroup" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutorId" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "name" character varying`);
    }

}
