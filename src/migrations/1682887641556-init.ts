import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682887641556 implements MigrationInterface {
    name = 'Init1682887641556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" ADD "precio" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra" DROP COLUMN "monto_total"`);
        await queryRunner.query(`ALTER TABLE "compra" ADD "monto_total" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento" DROP COLUMN "hora"`);
        await queryRunner.query(`ALTER TABLE "evento" ADD "hora" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "evento" ADD "descripcion" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "precio" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "precio" ADD "precio" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "precio" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "precio" ADD "precio" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "evento" ADD "descripcion" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento" DROP COLUMN "hora"`);
        await queryRunner.query(`ALTER TABLE "evento" ADD "hora" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra" DROP COLUMN "monto_total"`);
        await queryRunner.query(`ALTER TABLE "compra" ADD "monto_total" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" ADD "precio" integer NOT NULL`);
    }

}
