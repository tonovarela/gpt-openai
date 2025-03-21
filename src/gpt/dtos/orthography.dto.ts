import { isIn, IsInt, IsOptional, IsString } from "class-validator";


export class OrthographyDto {
    @IsString()
    prompt: string;
    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;
}