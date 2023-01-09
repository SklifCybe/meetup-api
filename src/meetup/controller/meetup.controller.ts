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

import { PageOptionDto } from '../dto/page-option.dto';
import { MeetupService } from '../service/meetup.service';
import { CreateMeetupDto } from '../dto/create-meetup.dto';
import { UpdateMeetupDto } from '../dto/update-meetup.dto';
import { RemoveQuotesPipe } from '../pipe/remove-quotes.pipe';

@Controller('meetup')
@UseInterceptors(ClassSerializerInterceptor)
export class MeetupController {
    constructor(private readonly meetupService: MeetupService) {}

    @Get()
    async getAll(@Query(RemoveQuotesPipe) pageOptionDto: PageOptionDto) {
        return this.meetupService.findAll(pageOptionDto);
    }

    @Get(':id')
    async getOneById(@Param('id', ParseIntPipe) id: number) {
        return this.meetupService.findById(id);
    }

    @Post()
    async create(@Body() createMeetupDto: CreateMeetupDto) {
        return this.meetupService.registrationNewMeetup(createMeetupDto);
    }

    @Patch(':id')
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMeetupDto: UpdateMeetupDto,
    ) {
        return this.meetupService.edit(id, updateMeetupDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.meetupService.remove(id);
    }
}
