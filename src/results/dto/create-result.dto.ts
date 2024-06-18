import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateResultDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  participantId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
    points: number;
}