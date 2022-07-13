import { ExampleModel } from '@modules/shared/models/example.model';
import { ExampleQueries } from '@modules/shared/queries/example.queries';
import { ExampleRepository } from '@modules/shared/repositories/example.repository';
import { Test } from '@nestjs/testing';
import { UpdateCommand, UpdateCommandHandler } from './update.command';

describe('Example delete command test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    let handler: UpdateCommandHandler;

    const exampleQueries = {
        get: jest.fn(),
    };

    const exampleQueriesProvider = {
        provide: ExampleQueries,
        useFactory: () => exampleQueries,
    };

    const exampleRepository = {
        add: jest.fn(),
        update: jest.fn(),
    };

    const exampleRepositoryProvider = {
        provide: ExampleRepository,
        useFactory: () => exampleRepository,
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [exampleQueriesProvider, exampleRepositoryProvider, UpdateCommandHandler],
        }).compile();

        handler = await moduleRef.resolve<UpdateCommandHandler>(UpdateCommandHandler);
    });

    test('Run apply successfully. Should run as expected', async () => {
        const data = new UpdateCommand({
            id: 1,
            name: 'name',
        } as ExampleModel);

        exampleQueries.get = jest.fn().mockReturnValue({
            id: 1,
            name: 'name',
        });

        await handler.apply(data);

        expect(exampleQueries.get).toBeCalledTimes(1);
        expect(exampleQueries.get).toBeCalledWith(data.data.id);

        expect(exampleRepository.update).toBeCalledTimes(1);
    });
});
