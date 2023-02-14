import { Module } from '@nestjs/common';
import {
  AppController,
  PolyanetController,
  SoloonController,
  ComethController,
} from './app.controller';
import {
  AppService,
  SoloonService,
  PolyanetService,
  ComethService,
} from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
  ],
  controllers: [
    AppController,
    PolyanetController,
    SoloonController,
    ComethController,
  ],
  providers: [AppService, PolyanetService, SoloonService, ComethService],
})
export class AppModule {}
