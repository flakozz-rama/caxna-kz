import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitTables1751198197694 implements MigrationInterface {
  name = 'CreateInitTables1751198197694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."zhanalyqtar_category_enum" AS ENUM('culture', 'art', 'theater', 'music', 'cinema', 'literature', 'festival', 'exhibition', 'award', 'event')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."zhanalyqtar_status_enum" AS ENUM('draft', 'published', 'archived')`,
    );
    await queryRunner.query(
      `CREATE TABLE "zhanalyqtar" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title_kaz" character varying(500) NOT NULL, "title_qaz" character varying(500) NOT NULL, "content_kaz" text NOT NULL, "content_qaz" text NOT NULL, "category" "public"."zhanalyqtar_category_enum" NOT NULL DEFAULT 'culture', "slug" character varying(255) NOT NULL, "thumbnail_url" character varying, "status" "public"."zhanalyqtar_status_enum" NOT NULL DEFAULT 'draft', "views" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "event_date" TIMESTAMP, "location_kaz" character varying(200), "location_qaz" character varying(200), "author_id" character varying, "tags" text array NOT NULL DEFAULT '{}', "meta_description_kaz" character varying(500), "meta_description_qaz" character varying(500), "isFeatured" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_310f4015ff6bce3ef67bc52f569" UNIQUE ("slug"), CONSTRAINT "PK_cedd12bda3edadac6cbb438a806" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_53bffd9a97a76cd24cc2108a84" ON "zhanalyqtar" ("status", "created_at") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_310f4015ff6bce3ef67bc52f56" ON "zhanalyqtar" ("slug") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."videos_category_enum" AS ENUM('music', 'theater', 'art', 'cinema', 'dance', 'culture', 'interview', 'documentary')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."videos_status_enum" AS ENUM('draft', 'published', 'archived')`,
    );
    await queryRunner.query(
      `CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title_kaz" character varying(500) NOT NULL, "title_qaz" character varying(500) NOT NULL, "description_kaz" text, "description_qaz" text, "duration" character varying(10) NOT NULL, "thumbnail_url" character varying, "video_url" character varying NOT NULL, "category" "public"."videos_category_enum" NOT NULL DEFAULT 'culture', "status" "public"."videos_status_enum" NOT NULL DEFAULT 'draft', "views" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "author_id" character varying, "tags" text array NOT NULL DEFAULT '{}', "meta_description_kaz" character varying(500), "meta_description_qaz" character varying(500), CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa92ce74fa6331a7ad7743dea5" ON "videos" ("status", "created_at") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."interviews_status_enum" AS ENUM('draft', 'published', 'archived')`,
    );
    await queryRunner.query(
      `CREATE TABLE "interviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title_kaz" character varying(500) NOT NULL, "title_qaz" character varying(500) NOT NULL, "content_kaz" text NOT NULL, "content_qaz" text NOT NULL, "interviewee_name_kaz" character varying(200) NOT NULL, "interviewee_name_qaz" character varying(200) NOT NULL, "interviewee_title_kaz" character varying(200), "interviewee_title_qaz" character varying(200), "interviewee_bio_kaz" text, "interviewee_bio_qaz" text, "slug" character varying(255) NOT NULL, "thumbnail_url" character varying, "status" "public"."interviews_status_enum" NOT NULL DEFAULT 'draft', "views" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "interview_date" TIMESTAMP, "author_id" character varying, "tags" text array NOT NULL DEFAULT '{}', "meta_description_kaz" character varying(500), "meta_description_qaz" character varying(500), CONSTRAINT "UQ_32c51c4d8f044eb1547928c2efa" UNIQUE ("slug"), CONSTRAINT "PK_fd41af1f96d698fa33c2f070f47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b57dd805fb92a2900cad23a2a6" ON "interviews" ("status", "created_at") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_32c51c4d8f044eb1547928c2ef" ON "interviews" ("slug") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."articles_category_enum" AS ENUM('culture', 'art', 'history', 'literature', 'music', 'theater', 'cinema', 'traditions')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."articles_status_enum" AS ENUM('draft', 'published', 'archived')`,
    );
    await queryRunner.query(
      `CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title_kaz" character varying(500) NOT NULL, "title_qaz" character varying(500) NOT NULL, "content_kaz" text NOT NULL, "content_qaz" text NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "category" "public"."articles_category_enum" NOT NULL DEFAULT 'culture', "slug" character varying(255) NOT NULL, "thumbnail_url" character varying, "status" "public"."articles_status_enum" NOT NULL DEFAULT 'draft', "views" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "author_id" character varying, "meta_description_kaz" character varying(500), "meta_description_qaz" character varying(500), CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8cedbd46147ad40643f0efd1c0" ON "articles" ("status", "created_at") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1123ff6815c5b8fec0ba9fec37" ON "articles" ("slug") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'editor', 'viewer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "hashed_password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'viewer', "isEmailVerified" boolean NOT NULL DEFAULT false, "lastLoginAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arnaiy_zhobalar_type_enum" AS ENUM('festival', 'exhibition', 'concert', 'conference', 'workshop', 'competition', 'award_ceremony', 'special_event')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arnaiy_zhobalar_status_enum" AS ENUM('draft', 'published', 'archived', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "arnaiy_zhobalar" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title_kaz" character varying(500) NOT NULL, "title_qaz" character varying(500) NOT NULL, "content_kaz" text NOT NULL, "content_qaz" text NOT NULL, "type" "public"."arnaiy_zhobalar_type_enum" NOT NULL DEFAULT 'special_event', "slug" character varying(255) NOT NULL, "thumbnail_url" character varying, "status" "public"."arnaiy_zhobalar_status_enum" NOT NULL DEFAULT 'draft', "event_date" TIMESTAMP NOT NULL, "event_end_date" TIMESTAMP, "location_kaz" character varying(200) NOT NULL, "location_qaz" character varying(200) NOT NULL, "organizer_kaz" character varying(200), "organizer_qaz" character varying(200), "contact_info" character varying(500), "ticket_info" character varying(500), "views" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "author_id" character varying, "tags" text array NOT NULL DEFAULT '{}', "meta_description_kaz" character varying(500), "meta_description_qaz" character varying(500), "isFeatured" boolean NOT NULL DEFAULT false, "isFree" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_9530dfeb45f38c8d69ffe490976" UNIQUE ("slug"), CONSTRAINT "PK_b389ae5759cb0a7fe26ee3ee335" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_30e975e5446d08520ee467daa2" ON "arnaiy_zhobalar" ("status", "event_date") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9530dfeb45f38c8d69ffe49097" ON "arnaiy_zhobalar" ("slug") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9530dfeb45f38c8d69ffe49097"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_30e975e5446d08520ee467daa2"`,
    );
    await queryRunner.query(`DROP TABLE "arnaiy_zhobalar"`);
    await queryRunner.query(`DROP TYPE "public"."arnaiy_zhobalar_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."arnaiy_zhobalar_type_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1123ff6815c5b8fec0ba9fec37"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8cedbd46147ad40643f0efd1c0"`,
    );
    await queryRunner.query(`DROP TABLE "articles"`);
    await queryRunner.query(`DROP TYPE "public"."articles_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."articles_category_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32c51c4d8f044eb1547928c2ef"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b57dd805fb92a2900cad23a2a6"`,
    );
    await queryRunner.query(`DROP TABLE "interviews"`);
    await queryRunner.query(`DROP TYPE "public"."interviews_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa92ce74fa6331a7ad7743dea5"`,
    );
    await queryRunner.query(`DROP TABLE "videos"`);
    await queryRunner.query(`DROP TYPE "public"."videos_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."videos_category_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_310f4015ff6bce3ef67bc52f56"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_53bffd9a97a76cd24cc2108a84"`,
    );
    await queryRunner.query(`DROP TABLE "zhanalyqtar"`);
    await queryRunner.query(`DROP TYPE "public"."zhanalyqtar_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."zhanalyqtar_category_enum"`);
  }
}
