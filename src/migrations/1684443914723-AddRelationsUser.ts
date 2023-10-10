import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsUser1684443914723 implements MigrationInterface {
    name = 'AddRelationsUser1684443914723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_list" ("user_id" integer NOT NULL, "contact_id" integer NOT NULL, CONSTRAINT "PK_fd74fd15dd19cddd4277b3657d9" PRIMARY KEY ("user_id", "contact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8ca19465dd707275d7f82566c" ON "contact_list" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b049972ed015624d0ee326c4e5" ON "contact_list" ("contact_id") `);
        await queryRunner.query(`ALTER TABLE "contact_list" ADD CONSTRAINT "FK_f8ca19465dd707275d7f82566cd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contact_list" ADD CONSTRAINT "FK_b049972ed015624d0ee326c4e5b" FOREIGN KEY ("contact_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_list" DROP CONSTRAINT "FK_b049972ed015624d0ee326c4e5b"`);
        await queryRunner.query(`ALTER TABLE "contact_list" DROP CONSTRAINT "FK_f8ca19465dd707275d7f82566cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b049972ed015624d0ee326c4e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8ca19465dd707275d7f82566c"`);
        await queryRunner.query(`DROP TABLE "contact_list"`);
    }

}
