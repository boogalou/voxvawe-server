import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDialog1680737183255 implements MigrationInterface {
    name = 'CreateDialog1680737183255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dialogs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "last_message_time" TIMESTAMP, "last_message_text" character varying, "last_message_status" character varying, "interlocutor_id" character varying NOT NULL, "interlocutor_name" character varying NOT NULL, "interlocutor_avatar" character varying, "unread_messages" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_75ffe676a97ca2eb5510ec88b11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_dialogs" ("dialog_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_ecbda2fa4a789948aa8d838eae6" PRIMARY KEY ("dialog_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ff30070976cc315a2ddd31b4d" ON "user_dialogs" ("dialog_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_639d07253c52e2744617191501" ON "user_dialogs" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "user_dialogs" ADD CONSTRAINT "FK_6ff30070976cc315a2ddd31b4d5" FOREIGN KEY ("dialog_id") REFERENCES "dialogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_dialogs" ADD CONSTRAINT "FK_639d07253c52e27446171915011" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_dialogs" DROP CONSTRAINT "FK_639d07253c52e27446171915011"`);
        await queryRunner.query(`ALTER TABLE "user_dialogs" DROP CONSTRAINT "FK_6ff30070976cc315a2ddd31b4d5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_639d07253c52e2744617191501"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ff30070976cc315a2ddd31b4d"`);
        await queryRunner.query(`DROP TABLE "user_dialogs"`);
        await queryRunner.query(`DROP TABLE "dialogs"`);
    }

}
