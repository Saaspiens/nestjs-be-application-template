import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, InitialModule } from 'be-core';
import { DataSource } from 'typeorm';
import { load } from './config';
let dataSource: DataSource;
@Module({
    imports: [
        InitialModule,
        AuthModule,
        ConfigModule.forRoot({
            load: [load],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (request: any) => {
                return {
                    type: 'mysql',
                    host: request.scopeVariable.primary.host,
                    port: request.scopeVariable.primary.port,
                    username: request.scopeVariable.primary.username,
                    password: request.scopeVariable.primary.password,
                    database: request.scopeVariable.primary.database,
                    entities: [__dirname + '/modules/shared/models/*{.ts,.js}'],
                    synchronize: false,
                    retryAttempts: 3,
                    retryDelay: 1000,
                };
            },
            dataSourceFactory: async (option) => {
                if (dataSource && dataSource.isInitialized) {
                    await dataSource.destroy();
                }
                dataSource = new DataSource(option!);
                return await dataSource.initialize();
            },
            inject: [REQUEST],
        }),
    ],
})
export class AppModule {}
