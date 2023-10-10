import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldOwnerIdToDialogEntity1685571223943 implements MigrationInterface {
    name = 'AddFieldOwnerIdToDialogEntity1685571223943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "ownerId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "ownerId"`);
    }

}
