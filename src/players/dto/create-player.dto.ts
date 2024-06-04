import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePlayerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    alias: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nationality: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    age: number;
}
