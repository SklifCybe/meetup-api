import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeIsDate1672047796811 implements MigrationInterface {
    name = 'TimeIsDate1672047796811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meetup_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "keywords" character varying NOT NULL, "time" TIMESTAMP WITH TIME ZONE NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_fbdef6faaf802d5552de76b98dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meetup_entity"`);
    }

}
