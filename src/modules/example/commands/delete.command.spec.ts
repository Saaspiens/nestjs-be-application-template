import { ExampleQueries } from '@modules/shared/queries/example.queries';
import { ExampleRepository } from '@modules/shared/repositories/example.repository';
import { Test } from '@nestjs/testing';
import { DeleteCommand, DeleteCommandHandler } from './delete.command';
import { UpdateCommand, UpdateCommandHandler } from './update.command';

describe('Example delete command test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    let handler: DeleteCommandHandler;

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
            providers: [exampleQueriesProvider, exampleRepositoryProvider, DeleteCommandHandler],
        }).compile();

        handler = await moduleRef.resolve<DeleteCommandHandler>(DeleteCommandHandler);
    });

    test('Run apply successfully. Should run as expected', async () => {
        const data = new DeleteCommand(1);

        exampleQueries.get = jest.fn().mockReturnValue({
            id: '1',
            name: 'name',
            isDeleted: false,
        });

        await handler.apply(data);

        expect(exampleQueries.get).toBeCalledTimes(1);
        expect(exampleQueries.get).toBeCalledWith(data.id);

        expect(exampleRepository.update).toBeCalledTimes(1);
    });

    test('Run apply with data is deleted already. Should run as expected', async () => {
        const data = new DeleteCommand(1);

        exampleQueries.get = jest.fn().mockReturnValue({
            id: '1',
            name: 'name',
            isDeleted: true,
        });

        await handler.apply(data);

        expect(exampleRepository.update).toBeCalledTimes(0);
    });

    test("Run apply with data doesn't exist. Should run as expected", async () => {
        const data = new DeleteCommand(1);

        exampleQueries.get = jest.fn().mockReturnValue(null);

        await handler.apply(data);

        expect(exampleRepository.update).toBeCalledTimes(0);
    });
});
