import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682887850592 implements MigrationInterface {
    name = 'Init1682887850592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "foto_evento_usuarios_user" ("foto_evento_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_ca77599668e45f44fc88f0490be" PRIMARY KEY ("foto_evento_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_158beda5ecec4275aff6f26433" ON "foto_evento_usuarios_user" ("foto_evento_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7035f0fd86697735ed0be3607" ON "foto_evento_usuarios_user" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user_fotos_eventos_foto_evento" ("user_id" uuid NOT NULL, "foto_evento_id" uuid NOT NULL, CONSTRAINT "PK_ced8bd6e494fd2f3e121aa24bdd" PRIMARY KEY ("user_id", "foto_evento_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_036a8842eef42ce40169bc5abf" ON "user_fotos_eventos_foto_evento" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1069da17e16362a39cbc6b31b6" ON "user_fotos_eventos_foto_evento" ("foto_evento_id") `);
        await queryRunner.query(`ALTER TABLE "foto_evento_usuarios_user" ADD CONSTRAINT "FK_158beda5ecec4275aff6f264336" FOREIGN KEY ("foto_evento_id") REFERENCES "foto_evento"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "foto_evento_usuarios_user" ADD CONSTRAINT "FK_b7035f0fd86697735ed0be3607e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_fotos_eventos_foto_evento" ADD CONSTRAINT "FK_036a8842eef42ce40169bc5abfb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_fotos_eventos_foto_evento" ADD CONSTRAINT "FK_1069da17e16362a39cbc6b31b6b" FOREIGN KEY ("foto_evento_id") REFERENCES "foto_evento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_fotos_eventos_foto_evento" DROP CONSTRAINT "FK_1069da17e16362a39cbc6b31b6b"`);
        await queryRunner.query(`ALTER TABLE "user_fotos_eventos_foto_evento" DROP CONSTRAINT "FK_036a8842eef42ce40169bc5abfb"`);
        await queryRunner.query(`ALTER TABLE "foto_evento_usuarios_user" DROP CONSTRAINT "FK_b7035f0fd86697735ed0be3607e"`);
        await queryRunner.query(`ALTER TABLE "foto_evento_usuarios_user" DROP CONSTRAINT "FK_158beda5ecec4275aff6f264336"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1069da17e16362a39cbc6b31b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_036a8842eef42ce40169bc5abf"`);
        await queryRunner.query(`DROP TABLE "user_fotos_eventos_foto_evento"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7035f0fd86697735ed0be3607"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_158beda5ecec4275aff6f26433"`);
        await queryRunner.query(`DROP TABLE "foto_evento_usuarios_user"`);
    }

}
