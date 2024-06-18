import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRewardDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number;
}
