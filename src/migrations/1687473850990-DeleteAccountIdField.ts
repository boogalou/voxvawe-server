import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteAccountIdField1687473850990 implements MigrationInterface {
    name = 'DeleteAccountIdField1687473850990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "UQ_a280745fc3975bd18695ae8dde2"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "UQ_3c5b69b9a9a4e3b029e3fef411d"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "accountId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "UQ_a280745fc3975bd18695ae8dde2" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "UQ_3c5b69b9a9a4e3b029e3fef411d" UNIQUE ("email")`);
    }

}
