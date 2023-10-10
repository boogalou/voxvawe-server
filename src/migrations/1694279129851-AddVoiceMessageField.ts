import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVoiceMessageField1694279129851 implements MigrationInterface {
    name = 'AddVoiceMessageField1694279129851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "voice_message" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "voice_message"`);
    }

}
