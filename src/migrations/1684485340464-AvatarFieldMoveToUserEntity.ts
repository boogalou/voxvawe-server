import { MigrationInterface, QueryRunner } from "typeorm";

export class AvatarFieldMoveToUserEntity1684485340464 implements MigrationInterface {
    name = 'AvatarFieldMoveToUserEntity1684485340464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "avatar" character varying NOT NULL DEFAULT ''`);
    }

}
