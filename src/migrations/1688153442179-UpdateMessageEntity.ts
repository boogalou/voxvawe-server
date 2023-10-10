import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageEntity1688153442179 implements MigrationInterface {
    name = 'UpdateMessageEntityEntity1688153442179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "editAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "editAt" SET NOT NULL`);
    }

}
