import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683495890088 implements MigrationInterface {
    name = 'Init1683495890088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto_evento" ADD "fotografo_id" uuid`);
        await queryRunner.query(`ALTER TABLE "foto_evento" ADD CONSTRAINT "FK_602466c0723302d8391ad2ffadf" FOREIGN KEY ("fotografo_id") REFERENCES "fotografo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto_evento" DROP CONSTRAINT "FK_602466c0723302d8391ad2ffadf"`);
        await queryRunner.query(`ALTER TABLE "foto_evento" DROP COLUMN "fotografo_id"`);
    }

}
