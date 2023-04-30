import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682865403556 implements MigrationInterface {
    name = 'Init1682865403556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rol_usuarios_user" ("rol_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_a577f07f9b18ff09a98e7cc1b52" PRIMARY KEY ("rol_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_86e1c784738e424a2fb9d19108" ON "rol_usuarios_user" ("rol_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b0710725d6b655e8f6c751389" ON "rol_usuarios_user" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user_roles_rol" ("user_id" uuid NOT NULL, "rol_id" uuid NOT NULL, CONSTRAINT "PK_83310323d424b286cb3b29d50c4" PRIMARY KEY ("user_id", "rol_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d89357e876b18bf7899a336198" ON "user_roles_rol" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a78699e017ff93ad0da5a3c58" ON "user_roles_rol" ("rol_id") `);
        await queryRunner.query(`ALTER TABLE "rol_usuarios_user" ADD CONSTRAINT "FK_86e1c784738e424a2fb9d19108d" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rol_usuarios_user" ADD CONSTRAINT "FK_3b0710725d6b655e8f6c751389b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_rol" ADD CONSTRAINT "FK_d89357e876b18bf7899a3361980" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_rol" ADD CONSTRAINT "FK_6a78699e017ff93ad0da5a3c584" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_rol" DROP CONSTRAINT "FK_6a78699e017ff93ad0da5a3c584"`);
        await queryRunner.query(`ALTER TABLE "user_roles_rol" DROP CONSTRAINT "FK_d89357e876b18bf7899a3361980"`);
        await queryRunner.query(`ALTER TABLE "rol_usuarios_user" DROP CONSTRAINT "FK_3b0710725d6b655e8f6c751389b"`);
        await queryRunner.query(`ALTER TABLE "rol_usuarios_user" DROP CONSTRAINT "FK_86e1c784738e424a2fb9d19108d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a78699e017ff93ad0da5a3c58"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d89357e876b18bf7899a336198"`);
        await queryRunner.query(`DROP TABLE "user_roles_rol"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b0710725d6b655e8f6c751389"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86e1c784738e424a2fb9d19108"`);
        await queryRunner.query(`DROP TABLE "rol_usuarios_user"`);
    }

}
