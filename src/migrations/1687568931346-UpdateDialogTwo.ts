import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDialogTwo1687568931346 implements MigrationInterface {
    name = 'UpdateDialogTwo1687568931346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "lastMessageTime"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "lastMessageText"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "lastMessageStatus"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutorName"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutorAvatar"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "unreadMessages"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "unreadMessages" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutorAvatar" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutorName" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "lastMessageStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "lastMessageText" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "lastMessageTime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "isActive" boolean NOT NULL DEFAULT false`);
    }

}
