import { ApiProperty } from '@nestjs/swagger';

export class PolyanetDTO {
  @ApiProperty({ type: Number, required: true })
  readonly row: number;
  @ApiProperty({ type: Number, required: true })
  readonly column: number;
}
