import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, retry } from 'rxjs';
import { PolyanetDTO, SoloonDTO, ComethDTO } from './dtos';

@Injectable()
export class AppService {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
  ) {}
  protected candidateId = this.configService.get<string>('CANDIDATE_ID');
  protected baseUrl = this.configService.get<string>('BASE_URL');

  async getGoalMap() {
    const url: string = this.baseUrl + `map/${this.candidateId}/goal`;
    const goal = this.httpService
      .get(url, {})
      .pipe(map((response) => response.data));

    return goal;
  }
}

@Injectable()
export class PolyanetService extends AppService {
  private url = this.baseUrl + 'polyanets';
  async create(polyanet: PolyanetDTO) {
    const data = {
      row: polyanet.row,
      column: polyanet.column,
      candidateId: this.candidateId,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        candidateId: this.candidateId,
      },
    };
    return this.httpService
      .post(this.url, data, config)
      .pipe(map((response) => response.status));
  }

  async delete(polyanet: PolyanetDTO) {
    const data = {
      row: polyanet.row,
      column: polyanet.column,
      candidateId: this.candidateId,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    const params = {
      candidateId: this.candidateId,
    };
    return this.httpService
      .delete(this.url, { headers, params, data })
      .pipe(map((response) => response.status));
  }

  async drawMap() {
    const polyanets: PolyanetDTO[] = [];
    const goalMap = await lastValueFrom(await this.getGoalMap());
    const goal = goalMap.goal;
    for (let i = 0; i < goal.length; i++) {
      for (let j = 0; j < goal[i].length; j++) {
        if (goal[i][j] === 'POLYANET') {
          polyanets.push({ row: i, column: j });
        }
      }
    }
    polyanets.map(async (polyanet, index) => {
      setTimeout(async () => {
        const op = await this.create(polyanet);
        await lastValueFrom(op);
      }, 2000 * index);
    });
  }
}

@Injectable()
export class SoloonService extends AppService {
  private url = this.baseUrl + 'soloons';
  async create(soloon: SoloonDTO) {
    const data = {
      row: soloon.row,
      column: soloon.column,
      color: soloon.color,
      candidateId: this.candidateId,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        candidateId: this.candidateId,
      },
    };
    return this.httpService
      .post(this.url, data, config)
      .pipe(map((response) => response.status));
  }

  async delete(soloon: SoloonDTO) {
    const data = {
      row: soloon.row,
      column: soloon.column,
      candidateId: this.candidateId,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    const params = {
      candidateId: this.candidateId,
    };
    return this.httpService
      .delete(this.url, { headers, params, data })
      .pipe(map((response) => response.status));
  }

  async drawMap() {
    const soloons: SoloonDTO[] = [];
    const goalMap = await lastValueFrom(await this.getGoalMap());
    const goal = goalMap.goal;
    for (let i = 0; i < goal.length; i++) {
      for (let j = 0; j < goal[i].length; j++) {
        if (goal[i][j].slice(-6) === 'SOLOON') {
          soloons.push({
            row: i,
            column: j,
            color: goal[i][j].slice(0, -7).toLowerCase(),
          });
        }
      }
    }
    soloons.map(async (soloon, index) => {
      setTimeout(async () => {
        const op = await this.create(soloon);
        await lastValueFrom(op);
      }, 2000 * index);
    });
  }
}

@Injectable()
export class ComethService extends AppService {
  private url = this.baseUrl + 'comeths';
  async create(cometh: ComethDTO) {
    const data = {
      row: cometh.row,
      column: cometh.column,
      direction: cometh.direction,
      candidateId: this.candidateId,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        candidateId: this.candidateId,
      },
    };
    return this.httpService
      .post(this.url, data, config)
      .pipe(map((response) => response.status));
  }

  async delete(cometh: ComethDTO) {
    const data = {
      row: cometh.row,
      column: cometh.column,
      candidateId: this.candidateId,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    const params = {
      candidateId: this.candidateId,
    };
    return this.httpService
      .delete(this.url, { headers, params, data })
      .pipe(map((response) => response.status));
  }

  async drawMap() {
    const comeths: ComethDTO[] = [];
    const goalMap = await lastValueFrom(await this.getGoalMap());
    const goal = goalMap.goal;
    for (let i = 0; i < goal.length; i++) {
      for (let j = 0; j < goal[i].length; j++) {
        if (goal[i][j].slice(-6) === 'COMETH') {
          comeths.push({
            row: i,
            column: j,
            direction: goal[i][j].slice(0, -7).toLowerCase(),
          });
        }
      }
    }
    comeths.map(async (cometh, index) => {
      setTimeout(async () => {
        const op = await this.create(cometh);
        await lastValueFrom(op);
        console.log(cometh);
      }, 2000 * index);
    });
  }
}
