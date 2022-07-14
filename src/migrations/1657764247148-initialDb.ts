import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialDb1657764247148 implements MigrationInterface {
    name = 'initialDb1657764247148';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`example_model\` (\`is_deleted\` tinyint NOT NULL, \`created_date\` datetime NOT NULL, \`created_by\` int NOT NULL, \`modified_date\` datetime NOT NULL, \`modified_by\` int NOT NULL, \`company_id\` int NOT NULL DEFAULT '-1', \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`example_model\``);
    }
}
