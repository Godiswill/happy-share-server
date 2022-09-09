import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsUrl } from 'class-validator';

export class CreatePostDto {
  @ApiPropertyOptional({ description: '文章链接' })
  @IsNotEmpty()
  @IsUrl(undefined, { message: '文章链接格式不正确' })
  @MaxLength(8182, { message: '文章链接长度过长' })
  readonly url: string;

  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  @MaxLength(50, { message: '文章标题长度过长' })
  readonly title: string;

  @ApiProperty({ description: '推荐人' })
  @IsNotEmpty({ message: '缺少推荐人信息' })
  @MaxLength(32, { message: '推荐人长度过长' })
  readonly referee: string;

  @ApiPropertyOptional({ description: '推荐理由' })
  @MaxLength(120, { message: '理由长度过长' })
  readonly reason: string;

  @ApiPropertyOptional({ description: '文章分类' })
  @MaxLength(20, { message: '理由长度过长' })
  readonly category: string;

  // @ApiProperty({ description: '文章状态' })
  // @IsInt({ message: '必须是整数' })
  // @Min(0, { message: '不能小于 0' })
  // @Max(3, { message: '不能大于 3' })
  // readonly status: number;
}
