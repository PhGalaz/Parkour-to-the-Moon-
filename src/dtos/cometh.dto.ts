import { ApiProperty } from '@nestjs/swagger';

export class ComethDTO {
  @ApiProperty({ type: Number, required: true })
  readonly row: number;
  @ApiProperty({ type: Number, required: true })
  readonly column: number;
  @ApiProperty({ type: String, required: true })
  readonly direction: string;
}
