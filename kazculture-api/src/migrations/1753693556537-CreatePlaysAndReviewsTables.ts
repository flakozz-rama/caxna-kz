import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlaysAndReviewsTables1753693556537 implements MigrationInterface {
    name = 'CreatePlaysAndReviewsTables1753693556537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create plays table
        await queryRunner.query(`CREATE TABLE "plays" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title" character varying(500) NOT NULL, "content" text NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "slug" character varying(255), "image_url" character varying, "status" character varying(20) NOT NULL DEFAULT 'draft', "views" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "author_id" character varying, CONSTRAINT "UQ_plays_slug" UNIQUE ("slug"), CONSTRAINT "PK_plays" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_plays_status_created" ON "plays" ("status", "created_at") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_plays_slug" ON "plays" ("slug") `);
        
        // Create reviews table
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title" character varying(500) NOT NULL, "content" text NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "slug" character varying(255), "image_url" character varying, "status" character varying(20) NOT NULL DEFAULT 'draft', "views" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "author_id" character varying, CONSTRAINT "UQ_reviews_slug" UNIQUE ("slug"), CONSTRAINT "PK_reviews" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_reviews_status_created" ON "reviews" ("status", "created_at") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_reviews_slug" ON "reviews" ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop reviews table and related objects
        await queryRunner.query(`DROP INDEX "public"."IDX_reviews_slug"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_reviews_status_created"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        
        // Drop plays table and related objects
        await queryRunner.query(`DROP INDEX "public"."IDX_plays_slug"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_plays_status_created"`);
        await queryRunner.query(`DROP TABLE "plays"`);
    }
}
