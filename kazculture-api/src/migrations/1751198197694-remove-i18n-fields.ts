import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveI18nFields1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ARTICLES
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN IF EXISTS "title_qaz"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN IF EXISTS "content_qaz"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN IF EXISTS "meta_description_qaz"`);

    // ZHANALYQTAR
    await queryRunner.query(`ALTER TABLE "zhanalyqtar" DROP COLUMN IF EXISTS "title_qaz"`);
    await queryRunner.query(`ALTER TABLE "zhanalyqtar" DROP COLUMN IF EXISTS "content_qaz"`);
    await queryRunner.query(`ALTER TABLE "zhanalyqtar" DROP COLUMN IF EXISTS "location_qaz"`);
    await queryRunner.query(`ALTER TABLE "zhanalyqtar" DROP COLUMN IF EXISTS "meta_description_qaz"`);

    // ARNAIY_ZHOBALAR
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" DROP COLUMN IF EXISTS "title_qaz"`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" DROP COLUMN IF EXISTS "content_qaz"`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" DROP COLUMN IF EXISTS "location_qaz"`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" DROP COLUMN IF EXISTS "organizer_qaz"`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" DROP COLUMN IF EXISTS "meta_description_qaz"`);

    // INTERVIEWS
    await queryRunner.query(`ALTER TABLE "interviews" DROP COLUMN IF EXISTS "title_qaz"`);
    await queryRunner.query(`ALTER TABLE "interviews" DROP COLUMN IF EXISTS "content_qaz"`);
    await queryRunner.query(`ALTER TABLE "interviews" DROP COLUMN IF EXISTS "meta_description_qaz"`);

    // VIDEOS
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN IF EXISTS "title_qaz"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN IF EXISTS "description_qaz"`);
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN IF EXISTS "meta_description_qaz"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат: добавить обратно все поля (если потребуется)
    await queryRunner.query(`ALTER TABLE "articles" ADD COLUMN "title_qaz" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "articles" ADD COLUMN "content_qaz" text`);
    await queryRunner.query(`ALTER TABLE "articles" ADD COLUMN "meta_description_qaz" character varying(500)`);

    await queryRunner.query(`ALTER TABLE "zhanalyqtar" ADD COLUMN "title_qaz" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "zhanalyqtar" ADD COLUMN "content_qaz" text`);
    await queryRunner.query(`ALTER TABLE "zhanalyqtar" ADD COLUMN "location_qaz" character varying(200)`);
    await queryRunner.query(`ALTER TABLE "zhanalyqtar" ADD COLUMN "meta_description_qaz" character varying(500)`);

    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" ADD COLUMN "title_qaz" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" ADD COLUMN "content_qaz" text`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" ADD COLUMN "location_qaz" character varying(200)`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" ADD COLUMN "organizer_qaz" character varying(200)`);
    await queryRunner.query(`ALTER TABLE "arnaiy_zhobalar" ADD COLUMN "meta_description_qaz" character varying(500)`);

    await queryRunner.query(`ALTER TABLE "interviews" ADD COLUMN "title_qaz" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "interviews" ADD COLUMN "content_qaz" text`);
    await queryRunner.query(`ALTER TABLE "interviews" ADD COLUMN "meta_description_qaz" character varying(500)`);

    await queryRunner.query(`ALTER TABLE "videos" ADD COLUMN "title_qaz" character varying(500)`);
    await queryRunner.query(`ALTER TABLE "videos" ADD COLUMN "description_qaz" text`);
    await queryRunner.query(`ALTER TABLE "videos" ADD COLUMN "meta_description_qaz" character varying(500)`);
  }
} 