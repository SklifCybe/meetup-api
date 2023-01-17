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

import { PageDto } from '../dto/page.dto';
import { MeetupEntity } from '../entity/meetup.entity';
import { PageOptionDto } from '../dto/page-option.dto';
import { MeetupService } from '../service/meetup.service';
import { CreateMeetupDto } from '../dto/create-meetup.dto';
import { UpdateMeetupDto } from '../dto/update-meetup.dto';

@Controller('meetup')
@UseInterceptors(ClassSerializerInterceptor)
export class MeetupController {
    constructor(private readonly meetupService: MeetupService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAll(
        @Query() pageOptionDto: PageOptionDto,
    ): Promise<PageDto> {
        return this.meetupService.findAll(pageOptionDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public async getOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MeetupEntity> {
        return this.meetupService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Body() createMeetupDto: CreateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.registrationNewMeetup(createMeetupDto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    public async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMeetupDto: UpdateMeetupDto,
    ): Promise<MeetupEntity> {
        return this.meetupService.edit(id, updateMeetupDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MeetupEntity> {
        return this.meetupService.remove(id);
    }
}
