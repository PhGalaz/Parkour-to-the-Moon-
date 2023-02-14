import { ApiProperty } from '@nestjs/swagger';

export class SoloonDTO {
  @ApiProperty({ type: Number, required: true })
  readonly row: number;
  @ApiProperty({ type: Number, required: true })
  readonly column: number;
  @ApiProperty({ type: String, required: true })
  readonly color: string;
}
