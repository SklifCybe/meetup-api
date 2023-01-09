import { MigrationInterface, QueryRunner } from "typeorm";

export class KeywordChangeOnDelete1672324076163 implements MigrationInterface {
    name = 'KeywordChangeOnDelete1672324076163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyword_entity" DROP CONSTRAINT "FK_89abcb3b74adc0a1c4146116d23"`);
        await queryRunner.query(`ALTER TABLE "keyword_entity" ADD CONSTRAINT "FK_89abcb3b74adc0a1c4146116d23" FOREIGN KEY ("meetupId") REFERENCES "meetup_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyword_entity" DROP CONSTRAINT "FK_89abcb3b74adc0a1c4146116d23"`);
        await queryRunner.query(`ALTER TABLE "keyword_entity" ADD CONSTRAINT "FK_89abcb3b74adc0a1c4146116d23" FOREIGN KEY ("meetupId") REFERENCES "meetup_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
