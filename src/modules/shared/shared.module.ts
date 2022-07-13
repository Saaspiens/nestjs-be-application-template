import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleModel } from './models/example.model';
import QueriesList from './queries';
import RepositoriesList from './repositories';

@Module({
    imports: [TypeOrmModule.forFeature([ExampleModel])],
    providers: [...QueriesList, ...RepositoriesList],
    exports: [...QueriesList, ...RepositoriesList],
})
export class SharedModule {}
