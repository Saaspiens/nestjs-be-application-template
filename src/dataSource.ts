import 'dotenv/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
    type: process.env.TYPE as any,
    host: process.env.HOST,
    port: process.env.PORT as unknown as number,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/modules/shared/models/*{.ts,.js}'],
    migrations: [__dirname + (process.env.MIGRATIONS as unknown as string)],
    synchronize: false,
});

export { dataSource };
