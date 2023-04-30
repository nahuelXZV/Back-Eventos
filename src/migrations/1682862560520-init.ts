import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682862560520 implements MigrationInterface {
    name = 'Init1682862560520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fotografo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tipo" character varying NOT NULL, "direccion" character varying NOT NULL, "correo_paypal" character varying, "usuario_id" uuid, CONSTRAINT "REL_373bfd6e2f54ab2e8c2400d608" UNIQUE ("usuario_id"), CONSTRAINT "PK_88e25a8c5db9156c717139de95c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tarjeta" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "numero" character varying NOT NULL, "nombre" character varying NOT NULL, "fecha_vencimiento" TIMESTAMP NOT NULL, "codigo_seguridad" character varying NOT NULL, CONSTRAINT "PK_b1540d7d57fc00ef80fd729ee07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "suscripcion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "precio" numeric(5,2) NOT NULL, "duracion" integer NOT NULL, "is_activa" boolean NOT NULL DEFAULT true, "tipo" character varying NOT NULL, CONSTRAINT "PK_977c709bd1d69d5fe210e158627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_suscripcion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "monto" double precision NOT NULL DEFAULT '0', "fecha_inicio" TIMESTAMP NOT NULL, "fecha_fin" TIMESTAMP NOT NULL, "usuario_id" uuid, "suscripcion_id" uuid, CONSTRAINT "PK_b226b48f93136f90b00bdd74bd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_organizador" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "foto_usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "extension" character varying NOT NULL, "dir_foto_compresa" character varying NOT NULL, "dir_foto_normal" character varying NOT NULL, "usuario_id" uuid, CONSTRAINT "PK_f5c5e9bec754881d0873335c087" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fotografo" ADD CONSTRAINT "FK_373bfd6e2f54ab2e8c2400d6084" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_suscripcion" ADD CONSTRAINT "FK_a4f14e28362bf1ca9c98449a4c4" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_suscripcion" ADD CONSTRAINT "FK_d0dda9c97ed08b61013582e16e7" FOREIGN KEY ("suscripcion_id") REFERENCES "suscripcion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto_usuario" ADD CONSTRAINT "FK_98ffd7845b6a5848e3e59b0cef0" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto_usuario" DROP CONSTRAINT "FK_98ffd7845b6a5848e3e59b0cef0"`);
        await queryRunner.query(`ALTER TABLE "usuario_suscripcion" DROP CONSTRAINT "FK_d0dda9c97ed08b61013582e16e7"`);
        await queryRunner.query(`ALTER TABLE "usuario_suscripcion" DROP CONSTRAINT "FK_a4f14e28362bf1ca9c98449a4c4"`);
        await queryRunner.query(`ALTER TABLE "fotografo" DROP CONSTRAINT "FK_373bfd6e2f54ab2e8c2400d6084"`);
        await queryRunner.query(`DROP TABLE "foto_usuario"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "usuario_suscripcion"`);
        await queryRunner.query(`DROP TABLE "suscripcion"`);
        await queryRunner.query(`DROP TABLE "tarjeta"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "fotografo"`);
    }

}
