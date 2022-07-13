import { ExampleModel } from '@modules/shared/models/example.model';
import { ExampleQueries } from '@modules/shared/queries/example.queries';
import { REQUEST } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Mediator } from 'be-core';
import { AddCommand, DeleteCommand, UpdateCommand } from './commands';
import { ExampleController } from './example.controller';

describe('Example controller test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    let controller: ExampleController;

    const mediator = {
        send: jest.fn(),
    };

    const mediatorProvider = {
        provide: Mediator,
        useFactory: () => mediator,
    };

    const exampleQueries = {
        get: jest.fn(),
        gets: jest.fn(),
    };

    const exampleQueriesProvider = {
        provide: ExampleQueries,
        useFactory: () => exampleQueries,
    };

    const requestMock = {
        scopeVariable: {
            accessToken: 'token',
        },
    };

    const requestProvider = {
        provide: REQUEST,
        useFactory: () => requestMock,
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [requestProvider, mediatorProvider, exampleQueriesProvider, ExampleController],
        }).compile();

        controller = await moduleRef.resolve<ExampleController>(ExampleController);
        controller.getUserSession = jest.fn().mockReturnValue({
            roles: [
                {
                    name: 'Administrator',
                },
            ],
        }); // Mock Administrator to test function without permission
    });

    test('Get function. Should run as expected', async () => {
        await controller.get(1);

        expect(exampleQueries.get).toBeCalledTimes(1);
        expect(exampleQueries.get).toBeCalledWith(1);
    });

    test('Gets function. Should run as expected', async () => {
        await controller.gets();

        expect(exampleQueries.gets).toBeCalledTimes(1);
    });

    test('Add function. Should run as expected', async () => {
        const data = new AddCommand({
            data: 'name',
        } as unknown as ExampleModel);

        await controller.add(data);

        expect(mediator.send).toBeCalledTimes(1);
        expect(mediator.send).toBeCalledWith(data);
    });

    test('Update function. Should run as expected', async () => {
        const data = new UpdateCommand({
            id: 1,
            data: 'name',
        } as unknown as ExampleModel);

        await controller.add(data);

        expect(mediator.send).toBeCalledTimes(1);
        expect(mediator.send).toBeCalledWith(data);
    });

    test('Delete function. Should run as expected', async () => {
        const data = new DeleteCommand(1);

        await controller.delete(data);

        expect(mediator.send).toBeCalledTimes(1);
        expect(mediator.send).toBeCalledWith(data);
    });
});
