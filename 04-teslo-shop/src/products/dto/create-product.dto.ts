import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product price',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product description',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: ' Product slug',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'Product stock',
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;
  @ApiProperty({
    description: 'Product sizes',
    nullable: false,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    description: 'Product gender',
    nullable: false,
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product tags',
    nullable: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}
