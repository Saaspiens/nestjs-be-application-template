import { ExampleQueries } from '@modules/shared/queries/example.queries';
import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Injectable,
    Param,
    Post,
    Put,
    Scope,
    UseInterceptors,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Authorize, BaseController, CoreResponseInterceptor, Headers, Mediator, Permission } from 'be-core';
import { AddCommand, DeleteCommand, UpdateCommand } from './commands';

@Controller('/core/v1/example')
@Injectable({ scope: Scope.REQUEST })
@UseInterceptors(CoreResponseInterceptor)
@ApiTags('Example')
@Headers()
export class ExampleController extends BaseController {
    constructor(@Inject(REQUEST) httpRequest: any, private mediator: Mediator, private exampleQueries: ExampleQueries) {
        super(httpRequest);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number })
    @Authorize('exampleManagement', Permission.View)
    async get(@Param('id') id: number) {
        return this.exampleQueries.get(id);
    }

    @Get('')
    @Authorize('exampleManagement', Permission.View)
    async gets() {
        return this.exampleQueries.gets();
    }

    @Post('')
    @ApiBody({ type: AddCommand })
    @Authorize('exampleManagement', Permission.Insert)
    async add(@Body() command: AddCommand) {
        return this.mediator.send(command);
    }

    @Put('')
    @ApiBody({ type: UpdateCommand })
    @Authorize('exampleManagement', Permission.Update)
    async update(@Body() command: UpdateCommand) {
        return this.mediator.send(command);
    }

    @Delete('')
    @ApiBody({ type: DeleteCommand })
    @Authorize('exampleManagement', Permission.Delete)
    async delete(@Body() command: DeleteCommand) {
        return this.mediator.send(command);
    }
}
