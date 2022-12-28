import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { PageOptionDto } from './dto/page-option.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupService } from './meetup.service';
import { RemoveQuotesPipe } from './pipe/remove-quotes.pipe';

@Controller('meetup')
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
