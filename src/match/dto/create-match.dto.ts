import { IsInt } from "class-validator";

export class CreateMatchDto {
    @IsInt()
    tournamentId: number; 
    @IsInt()
    participant1Id: number; 
    @IsInt()
    participant2Id: number
}
