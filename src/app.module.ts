import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions), MeetupModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
