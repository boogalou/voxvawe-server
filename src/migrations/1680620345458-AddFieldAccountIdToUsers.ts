import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldAccountIdToUsers1680620345458 implements MigrationInterface {
    name = 'AddFieldAccountIdToUsers1680620345458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "accountId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_42bba679e348de51a699fb0a803" UNIQUE ("accountId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountId"`);
    }

}
