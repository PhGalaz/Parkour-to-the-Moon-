import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  AppService,
  PolyanetService,
  SoloonService,
  ComethService,
} from './app.service';
import { PolyanetDTO, SoloonDTO, ComethDTO } from './dtos';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly polyanetService: PolyanetService,
    private readonly soloonService: SoloonService,
    private readonly comethService: ComethService,
  ) {}

  @Get('/goal-map')
  getGoalMap() {
    try {
      return this.appService.getGoalMap();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/draw-map')
  async drawMap() {
    try {
      await this.polyanetService.drawMap();
      await this.soloonService.drawMap();
      await this.comethService.drawMap();

      return 'Map drawn successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
}

@ApiTags('polyanet')
@Controller('polyanet')
export class PolyanetController {
  constructor(private readonly polyanetService: PolyanetService) {}
  @Post('/draw-map')
  async drawPolyanetMap() {
    try {
      await this.polyanetService.drawMap();
      return 'Map drawn successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
  @Post()
  @ApiBody({ type: PolyanetDTO, required: true })
  async createPolyanet(@Body() body: PolyanetDTO) {
    try {
      await this.polyanetService.create(body);
      return 'Polyanet created successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
  @Delete()
  @ApiBody({ type: PolyanetDTO, required: true })
  async deletePolyanet(@Body() body: PolyanetDTO) {
    try {
      await this.polyanetService.delete(body);
      return 'Polyanet deleted successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
}

@ApiTags('soloon')
@Controller('soloon')
export class SoloonController {
  constructor(private readonly soloonService: SoloonService) {}
  @Post('/draw-map')
  async drawSoloonMap() {
    try {
      await this.soloonService.drawMap();
      return 'Map drawn successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
  @Post()
  @ApiBody({ type: SoloonDTO, required: true })
  async createSoloon(@Body() body: SoloonDTO) {
    try {
      await this.soloonService.create(body);
      return 'Soloon created successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
  @Delete()
  @ApiBody({ type: SoloonDTO, required: true })
  async deleteSoloon(@Body() body: SoloonDTO) {
    try {
      await this.soloonService.delete(body);
      return 'Soloon deleted successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
}

@ApiTags('cometh')
@Controller('cometh')
export class ComethController {
  constructor(private readonly comethService: ComethService) {}
  @Post('/draw-map')
  async drawComethMap() {
    try {
      await this.comethService.drawMap();
      return 'Map drawn successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
  @Post()
  @ApiBody({ type: ComethDTO, required: true })
  async createCometh(@Body() body: ComethDTO) {
    try {
      await this.comethService.create(body);
      return 'Cometh created successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
  @Delete()
  @ApiBody({ type: ComethDTO, required: true })
  async deleteCometh(@Body() body: ComethDTO) {
    try {
      await this.comethService.delete(body);
      return 'Cometh deleted successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
}
