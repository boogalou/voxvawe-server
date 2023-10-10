import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserProfile1680872111929 implements MigrationInterface {
    name = 'CreateUserProfile1680872111929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_dialogs" DROP CONSTRAINT "FK_6ff30070976cc315a2ddd31b4d5"`);
        await queryRunner.query(`ALTER TABLE "user_dialogs" DROP CONSTRAINT "FK_639d07253c52e27446171915011"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ff30070976cc315a2ddd31b4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_639d07253c52e2744617191501"`);
        await queryRunner.query(`CREATE TABLE "user_profiles" ("id" SERIAL NOT NULL, "accountId" character varying NOT NULL, "username" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "avatar" character varying NOT NULL DEFAULT '', "gender" character varying NOT NULL DEFAULT '', "age" integer, "bio" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "UQ_a280745fc3975bd18695ae8dde2" UNIQUE ("accountId"), CONSTRAINT "UQ_3c5b69b9a9a4e3b029e3fef411d" UNIQUE ("email"), CONSTRAINT "REL_6ca9503d77ae39b4b5a6cc3ba8" UNIQUE ("user_id"), CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bca8e87e12fb44f95831a0b1bd" ON "user_dialogs" ("dialog_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_be1fd8a353c518e442fc3cf517" ON "user_dialogs" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_dialogs" ADD CONSTRAINT "FK_bca8e87e12fb44f95831a0b1bd7" FOREIGN KEY ("dialog_id") REFERENCES "dialogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_dialogs" ADD CONSTRAINT "FK_be1fd8a353c518e442fc3cf5176" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_dialogs" DROP CONSTRAINT "FK_be1fd8a353c518e442fc3cf5176"`);
        await queryRunner.query(`ALTER TABLE "user_dialogs" DROP CONSTRAINT "FK_bca8e87e12fb44f95831a0b1bd7"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be1fd8a353c518e442fc3cf517"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bca8e87e12fb44f95831a0b1bd"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`CREATE INDEX "IDX_639d07253c52e2744617191501" ON "user_dialogs" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ff30070976cc315a2ddd31b4d" ON "user_dialogs" ("dialog_id") `);
        await queryRunner.query(`ALTER TABLE "user_dialogs" ADD CONSTRAINT "FK_639d07253c52e27446171915011" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_dialogs" ADD CONSTRAINT "FK_6ff30070976cc315a2ddd31b4d5" FOREIGN KEY ("dialog_id") REFERENCES "dialogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
