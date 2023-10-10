import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageEnitiy1685512718554 implements MigrationInterface {
    name = 'AddMessageEnitiy1685512718554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "recipient" character varying NOT NULL, "body" character varying NOT NULL, "status" character varying NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "editAt" TIMESTAMP NOT NULL DEFAULT now(), "attachments" jsonb, "dialogId" integer, "senderId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "added_contacts" ("user_id" integer NOT NULL, "added_contact_id" integer NOT NULL, CONSTRAINT "PK_4b860bb2f997c3534fcf7b258ea" PRIMARY KEY ("user_id", "added_contact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a145d928dd293a4fdf83f764e" ON "added_contacts" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_060e23b00b675869e616eb7545" ON "added_contacts" ("added_contact_id") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_da5e0eb03e15dd7db2bb86fc153" FOREIGN KEY ("dialogId") REFERENCES "dialogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "added_contacts" ADD CONSTRAINT "FK_6a145d928dd293a4fdf83f764e9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "added_contacts" ADD CONSTRAINT "FK_060e23b00b675869e616eb75454" FOREIGN KEY ("added_contact_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "added_contacts" DROP CONSTRAINT "FK_060e23b00b675869e616eb75454"`);
        await queryRunner.query(`ALTER TABLE "added_contacts" DROP CONSTRAINT "FK_6a145d928dd293a4fdf83f764e9"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_da5e0eb03e15dd7db2bb86fc153"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_060e23b00b675869e616eb7545"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a145d928dd293a4fdf83f764e"`);
        await queryRunner.query(`DROP TABLE "added_contacts"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
