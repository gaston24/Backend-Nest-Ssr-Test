import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMoviesTable1748002554233 implements MigrationInterface {
    name = 'CreateMoviesTable1748002554233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "movies",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "episode_id",
                        type: "int",
                    },
                    {
                        name: "opening_crawl",
                        type: "text",
                    },
                    {
                        name: "director",
                        type: "varchar",
                    },
                    {
                        name: "producer",
                        type: "varchar",
                    },
                    {
                        name: "release_date",
                        type: "varchar",
                    },
                    {
                        name: "characters",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "planets",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "starships",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "vehicles",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "species",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "swapi_id",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movies");
    }

}
