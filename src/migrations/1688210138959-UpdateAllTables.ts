import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAllTables implements MigrationInterface {
    name = 'UpdateAllTables1688210138959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActivated"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastSeen"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isOnline"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "account_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_17a709b8b6146c491e6615c29d7" UNIQUE ("account_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_seen" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_online" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_activated" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "refresh_token" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "UQ_8769073e38c365f315426554ca5" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "UQ_8769073e38c365f315426554ca5"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_activated"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_online"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_seen"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_17a709b8b6146c491e6615c29d7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "refreshToken" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isOnline" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastSeen" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_42bba679e348de51a699fb0a803" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActivated" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
