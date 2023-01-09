import { MigrationInterface, QueryRunner } from "typeorm";

export class Keywords1672322265218 implements MigrationInterface {
    name = 'Keywords1672322265218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keyword_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "meetupId" integer, CONSTRAINT "PK_92982d6f9e6505ac0a66a88f42f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meetup_entity" DROP COLUMN "keywords"`);
        await queryRunner.query(`ALTER TABLE "keyword_entity" ADD CONSTRAINT "FK_89abcb3b74adc0a1c4146116d23" FOREIGN KEY ("meetupId") REFERENCES "meetup_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyword_entity" DROP CONSTRAINT "FK_89abcb3b74adc0a1c4146116d23"`);
        await queryRunner.query(`ALTER TABLE "meetup_entity" ADD "keywords" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "keyword_entity"`);
    }

}
