import { MigrationInterface, QueryRunner } from "typeorm";
import { AddFieldsToDialogs1691239750838 } from "./1691239750838-AddFieldsToDialogs";

export class  AddFieldsToDialogs1691240845591 implements MigrationInterface {
    name = 'AddFieldsToDialogs1691240845591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "group_name" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "group_name"`);
    }

}
