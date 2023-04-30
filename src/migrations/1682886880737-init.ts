import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682886880737 implements MigrationInterface {
    name = 'Init1682886880737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "precio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "precio" integer NOT NULL, "formato" character varying NOT NULL, "descripcion" character varying NOT NULL, CONSTRAINT "PK_5519b6f024c7ba63cf96128628a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "foto_evento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "extension" character varying NOT NULL, "dir_foto_compresa" character varying NOT NULL, "dir_foto_normal" character varying NOT NULL, "evento_id" uuid, "precio_id" uuid, CONSTRAINT "PK_fba7ab7742cc2db344021da99b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "compra_foto_evento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "formato_foto" character varying NOT NULL, "cantidad" integer NOT NULL, "precio" integer NOT NULL, "compra_id" uuid, "foto_evento_id" uuid, CONSTRAINT "PK_8068a2ce4528e7c2f280ab685d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "compra" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fecha" TIMESTAMP NOT NULL, "monto_total" integer NOT NULL, "metodo_pago" character varying NOT NULL, "usuario_id" uuid, "evento_id" uuid, CONSTRAINT "PK_1282735aa02eaee06c0e1b5da41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evento_fotografo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fecha" TIMESTAMP NOT NULL, "evento_id" uuid, "fotografo_id" uuid, CONSTRAINT "PK_6513698110da2135931fa3cd9d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "hora" character varying NOT NULL, "direccion" character varying NOT NULL, "descripcion" character varying NOT NULL, "tipo_evento" character varying NOT NULL, "privacidad_fotos" character varying NOT NULL, "ubicacion_google_maps" character varying NOT NULL, "usuario_id" uuid, CONSTRAINT "PK_ceb2e9607555230aee6aff546b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asiste" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fecha_aceptado" TIMESTAMP NOT NULL, "evento_id" uuid, "usuario_id" uuid, CONSTRAINT "PK_4fd6f793fb3625c00f693e31b2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "foto_evento" ADD CONSTRAINT "FK_586f812ae36554d1b45bc9ff1a6" FOREIGN KEY ("evento_id") REFERENCES "evento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto_evento" ADD CONSTRAINT "FK_a4b0f9231f6d931ae0d1bfa5117" FOREIGN KEY ("precio_id") REFERENCES "precio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" ADD CONSTRAINT "FK_1ea0c9b1e80dd0c5ec886f02294" FOREIGN KEY ("compra_id") REFERENCES "compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" ADD CONSTRAINT "FK_66d812fb6657dcae0d508aec7a4" FOREIGN KEY ("foto_evento_id") REFERENCES "foto_evento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_aca90c481b29b1c8a4bda31f3db" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_3cacc4da808d8ea191d6cec6625" FOREIGN KEY ("evento_id") REFERENCES "evento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" ADD CONSTRAINT "FK_33e66bb567e2c86df12f7095721" FOREIGN KEY ("evento_id") REFERENCES "evento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" ADD CONSTRAINT "FK_f4209106678fb0713cbcdf840e0" FOREIGN KEY ("fotografo_id") REFERENCES "fotografo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evento" ADD CONSTRAINT "FK_889ab659bcdb583edc2e593efb6" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asiste" ADD CONSTRAINT "FK_417316ac0b5f0ab2ecdef1ac0a4" FOREIGN KEY ("evento_id") REFERENCES "evento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asiste" ADD CONSTRAINT "FK_8d520d2473bacedaa53bf9a4d43" FOREIGN KEY ("usuario_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asiste" DROP CONSTRAINT "FK_8d520d2473bacedaa53bf9a4d43"`);
        await queryRunner.query(`ALTER TABLE "asiste" DROP CONSTRAINT "FK_417316ac0b5f0ab2ecdef1ac0a4"`);
        await queryRunner.query(`ALTER TABLE "evento" DROP CONSTRAINT "FK_889ab659bcdb583edc2e593efb6"`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" DROP CONSTRAINT "FK_f4209106678fb0713cbcdf840e0"`);
        await queryRunner.query(`ALTER TABLE "evento_fotografo" DROP CONSTRAINT "FK_33e66bb567e2c86df12f7095721"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_3cacc4da808d8ea191d6cec6625"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_aca90c481b29b1c8a4bda31f3db"`);
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" DROP CONSTRAINT "FK_66d812fb6657dcae0d508aec7a4"`);
        await queryRunner.query(`ALTER TABLE "compra_foto_evento" DROP CONSTRAINT "FK_1ea0c9b1e80dd0c5ec886f02294"`);
        await queryRunner.query(`ALTER TABLE "foto_evento" DROP CONSTRAINT "FK_a4b0f9231f6d931ae0d1bfa5117"`);
        await queryRunner.query(`ALTER TABLE "foto_evento" DROP CONSTRAINT "FK_586f812ae36554d1b45bc9ff1a6"`);
        await queryRunner.query(`DROP TABLE "asiste"`);
        await queryRunner.query(`DROP TABLE "evento"`);
        await queryRunner.query(`DROP TABLE "evento_fotografo"`);
        await queryRunner.query(`DROP TABLE "compra"`);
        await queryRunner.query(`DROP TABLE "compra_foto_evento"`);
        await queryRunner.query(`DROP TABLE "foto_evento"`);
        await queryRunner.query(`DROP TABLE "precio"`);
    }

}
