import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFieldCreatedAt1683727861894 implements MigrationInterface {
    name = 'FixFieldCreatedAt1683727861894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
