import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
} from '@nestjs/swagger';

import { PageDto } from '../dto/page.dto';
import { MeetupEntity } from '../entity/meetup.entity';
import { PageOptionDto } from '../dto/page-option.dto';
import { MeetupService } from '../service/meetup.service';
import { CreateMeetupDto } from '../dto/create-meetup.dto';
import { UpdateMeetupDto } from '../dto/update-meetup.dto';

@Controller('meetup')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Meetup')
@ApiBearerAuth()
export class MeetupController {
    constructor(private readonly meetupService: MeetupService) {}

    @ApiOkResponse({
        type: PageDto,
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAll(
        @Query() pageOptionDto: PageOptionDto,
    ): Promise<PageDto> {
        return this.meetupService.findAll(pageOptionDto);
    }

    @ApiOkResponse({
        type: MeetupEntity,
    })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public async getOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MeetupEntity> {
        return this.meetupService.findById(id);
    }

    @ApiOkResponse({
        type: MeetupEntity,
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Body() createMeetupDto: CreateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.registrationNewMeetup(createMeetupDto);
    }

    @ApiOkResponse({
        type: MeetupEntity,
    })
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    public async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMeetupDto: UpdateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.edit(id, updateMeetupDto);
    }

    @ApiOkResponse({
        type: MeetupEntity,
    })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MeetupEntity> {
        return this.meetupService.remove(id);
    }
}
