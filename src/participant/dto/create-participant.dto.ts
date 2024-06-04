import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateParticipantDto {
    @ApiProperty()
    @IsInt()
  @IsNotEmpty()
  tournamentId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  playerId: number;
}
