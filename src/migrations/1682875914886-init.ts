import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682875914886 implements MigrationInterface {
    name = 'Init1682875914886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarjeta" ADD "usuario_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tarjeta" ADD CONSTRAINT "UQ_46bc33e11b5c14b63a1ba84325c" UNIQUE ("usuario_id")`);
        await queryRunner.query(`ALTER TABLE "tarjeta" ADD CONSTRAINT "FK_46bc33e11b5c14b63a1ba84325c" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarjeta" DROP CONSTRAINT "FK_46bc33e11b5c14b63a1ba84325c"`);
        await queryRunner.query(`ALTER TABLE "tarjeta" DROP CONSTRAINT "UQ_46bc33e11b5c14b63a1ba84325c"`);
        await queryRunner.query(`ALTER TABLE "tarjeta" DROP COLUMN "usuario_id"`);
    }

}
