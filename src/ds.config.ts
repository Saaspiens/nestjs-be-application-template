import { DataSource } from 'typeorm';
import 'dotenv';

const dataSource = new DataSource({
    type: process.env.TYPE as any,
    host: process.env.HOST,
    port: process.env.PORT as any,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + (process.env.ENTITIES as string)],
    migrations: [__dirname + (process.env.MIGRATIONS as string)],
    synchronize: false,
});
export { dataSource };
