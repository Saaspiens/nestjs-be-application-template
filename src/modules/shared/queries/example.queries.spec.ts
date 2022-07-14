import { REQUEST } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExampleModel } from '../models/example.model';
import { ExampleQueries } from './example.queries';

describe('Example querties test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    let exampleQueries: ExampleQueries;

    const typeOrmExampleTestRepository = {
        findOne: jest.fn(),
        find: jest.fn(),
    };

    const typeOrmExampleTestRepositoryProvider = {
        provide: getRepositoryToken(ExampleModel),
        useFactory: () => typeOrmExampleTestRepository,
    };

    const requestMock = {
        scopeVariable: {},
    };

    const requestProvider = {
        provide: REQUEST,
        useFactory: () => requestMock,
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [typeOrmExampleTestRepositoryProvider, requestProvider, ExampleQueries],
        }).compile();

        exampleQueries = await moduleRef.resolve<ExampleQueries>(ExampleQueries);
    });

    test('Get function. Should run as expected', async () => {
        await exampleQueries.get(1);

        expect(typeOrmExampleTestRepository.findOne).toBeCalledTimes(1);
        expect(typeOrmExampleTestRepository.findOne).toBeCalledWith({
            where: {
                id: 1,
            },
        });
    });

    test('Gets function. Should run as expected', async () => {
        await exampleQueries.gets();

        expect(typeOrmExampleTestRepository.find).toBeCalledTimes(1);
        expect(typeOrmExampleTestRepository.find).toBeCalledWith({});
    });
});
