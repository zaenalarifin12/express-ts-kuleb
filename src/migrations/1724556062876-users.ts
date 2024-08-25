import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1724556062876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // this part you will add your self
    await queryRunner.query(
      ` 
            --Table Definition
            CREATE TABLE "users"  (
            "id" varchar(255) NOT NULL,
            "username" varchar(255) NOT NULL,
            "email" varchar(255) NOT NULL,
            "password" varchar(255) NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
 
              `
    ),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
