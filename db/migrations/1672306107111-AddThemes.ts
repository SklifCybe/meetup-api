import { MigrationInterface, QueryRunner } from "typeorm";

export class AddThemes1672306107111 implements MigrationInterface {
    name = 'AddThemes1672306107111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."meetup_entity_theme_enum" AS ENUM('frontend', 'backend', 'ui/ux', 'architecture', 'graphics', 'developer tools')`);
        await queryRunner.query(`CREATE TABLE "meetup_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "theme" "public"."meetup_entity_theme_enum" NOT NULL, "description" character varying NOT NULL, "keywords" character varying NOT NULL, "time" TIMESTAMP WITH TIME ZONE NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_fbdef6faaf802d5552de76b98dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meetup_entity"`);
        await queryRunner.query(`DROP TYPE "public"."meetup_entity_theme_enum"`);
    }

}
