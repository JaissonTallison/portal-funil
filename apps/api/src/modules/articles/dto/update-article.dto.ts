import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  IsEnum,
} from 'class-validator';

enum ArticleStatus {
  DRAFT = 'DRAFT',
  REVIEW = 'REVIEW',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateArticleDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional() @IsInt() @Min(1) readTime?: number;
  @IsOptional() @IsEnum(ArticleStatus) status?: ArticleStatus;
  @IsOptional() @IsBoolean() isLive?: boolean;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsOptional() @IsBoolean() isSponsored?: boolean;
  @IsOptional() @IsString() sponsor?: string;
}
