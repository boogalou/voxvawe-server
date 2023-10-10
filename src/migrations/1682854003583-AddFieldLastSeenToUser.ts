import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldLastSeenToUser1682854003583 implements MigrationInterface {
    name = 'AddFieldLastSeenToUser1682854003583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastSeen" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastSeen"`);
    }

}
