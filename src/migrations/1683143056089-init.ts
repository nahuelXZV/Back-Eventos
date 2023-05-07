import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683143056089 implements MigrationInterface {
    name = 'Init1683143056089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "compra" ADD "fecha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" ADD "fecha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "evento" ADD "fecha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asiste" DROP COLUMN "fecha_aceptado"`);
        await queryRunner.query(`ALTER TABLE "asiste" ADD "fecha_aceptado" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asiste" DROP COLUMN "fecha_aceptado"`);
        await queryRunner.query(`ALTER TABLE "asiste" ADD "fecha_aceptado" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "evento" ADD "fecha" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" ADD "fecha" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "compra" ADD "fecha" TIMESTAMP NOT NULL`);
    }

}
