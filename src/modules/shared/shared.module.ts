import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import QueriesList from './queries'
import RepositoriesList from './repositories'
import { ExampleModel } from './models/example.model';
import { CommonModule, ScopeVariableModule } from 'be-core';

@Module({
    imports: [
        ScopeVariableModule,
        CommonModule,
        TypeOrmModule.forFeature([
            ExampleModel
        ])
    ],
    providers: [
        ...QueriesList,
        ...RepositoriesList
    ],
    exports: [
        ...QueriesList,
        ...RepositoriesList
    ]
})
export class SharedModule { }
