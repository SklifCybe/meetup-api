import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';

import { PageDto } from '../dto/page.dto';
import { MeetupEntity } from '../entity/meetup.entity';
import { PageOptionDto } from '../dto/page-option.dto';
import { MeetupService } from '../service/meetup.service';
import { CreateMeetupDto } from '../dto/create-meetup.dto';
import { UpdateMeetupDto } from '../dto/update-meetup.dto';

@Controller('meetup')
@UseInterceptors(ClassSerializerInterceptor)
// todo: create @HttpCode to each endpoint
export class MeetupController {
    constructor(private readonly meetupService: MeetupService) {}

    @Get()
    public async getAll(
        @Query() pageOptionDto: PageOptionDto,
    ): Promise<PageDto> {
        return this.meetupService.findAll(pageOptionDto);
    }

    @Get(':id')
    public async getOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MeetupEntity> {
        return this.meetupService.findById(id);
    }

    @Post()
    public async create(
        @Body() createMeetupDto: CreateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.registrationNewMeetup(createMeetupDto);
    }

    @Patch(':id')
    public async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMeetupDto: UpdateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.edit(id, updateMeetupDto);
    }

    @Delete(':id')
    public async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MeetupEntity> {
        return this.meetupService.remove(id);
    }
}
