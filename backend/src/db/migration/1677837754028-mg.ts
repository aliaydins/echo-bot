import { MigrationInterface, QueryRunner } from 'typeorm';

export class mg1677837754028 implements MigrationInterface {
   name = 'mg1677837754028';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "conversation" (
                "id" SERIAL NOT NULL,
                "conversationId" character varying NOT NULL,
                "userMessage" character varying,
                "echoMessage" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "isDeleted" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id")
            )
        `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "conversation"
        `);
   }
}
