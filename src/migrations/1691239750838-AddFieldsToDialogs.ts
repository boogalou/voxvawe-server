import { MigrationInterface, QueryRunner } from "typeorm";

export class  AddFieldsToDialogs1691239750838 implements MigrationInterface {
    name = 'AddFieldsToDialogs1691239750838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "admin" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "group_avatar" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "group_avatar"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "admin"`);
    }

}
