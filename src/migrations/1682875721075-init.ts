import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682875721075 implements MigrationInterface {
    name = 'Init1682875721075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarjeta" DROP COLUMN "fecha_vencimiento"`);
        await queryRunner.query(`ALTER TABLE "tarjeta" ADD "fecha_vencimiento" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarjeta" DROP COLUMN "fecha_vencimiento"`);
        await queryRunner.query(`ALTER TABLE "tarjeta" ADD "fecha_vencimiento" TIMESTAMP NOT NULL`);
    }

}
