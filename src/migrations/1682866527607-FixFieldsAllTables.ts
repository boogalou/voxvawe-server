import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFieldsAllTables1682866527607 implements MigrationInterface {
    name = 'FixFieldsAllTables1682866527607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "last_message_time"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "last_message_text"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "last_message_status"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutor_id"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutor_name"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutor_avatar"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "unread_messages"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "lastMessageTime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "lastMessageText" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "lastMessageStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutorId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutorName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutorAvatar" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "unreadMessages" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "createdAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "updatedAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "unreadMessages"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutorAvatar"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutorName"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "interlocutorId"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "lastMessageStatus"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "lastMessageText"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP COLUMN "lastMessageTime"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "updated_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "unread_messages" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutor_avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutor_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "interlocutor_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "last_message_status" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "last_message_text" character varying`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "last_message_time" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "updated_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD "created_at" TIMESTAMP NOT NULL`);
    }

}
