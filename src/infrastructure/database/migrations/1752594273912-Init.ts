import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1752594273912 implements MigrationInterface {
  name = 'Init1752594273912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" uuid, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2f5e343630bd8b7e1e7534e82" ON "user" ("created_by") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6bfae5ab9f39212d5b6ad0276b" ON "user" ("updated_by") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7dda804b73a73af1c4fcab9a5b" ON "user" ("deleted_by") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" uuid, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" uuid, "price" integer NOT NULL, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a55db112f9059f73079e49597" ON "report" ("created_by") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_153b09948da20d094b0acf19fa" ON "report" ("updated_by") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a7f020c1c1b4bdc67d9af67e0c" ON "report" ("deleted_by") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a7f020c1c1b4bdc67d9af67e0c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_153b09948da20d094b0acf19fa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6a55db112f9059f73079e49597"`,
    );
    await queryRunner.query(`DROP TABLE "report"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7dda804b73a73af1c4fcab9a5b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6bfae5ab9f39212d5b6ad0276b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d2f5e343630bd8b7e1e7534e82"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
