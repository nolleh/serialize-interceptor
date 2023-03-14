import { ApiTags, ApiProperty } from "@nestjs/swagger";
import { Post, Body, Controller } from "@nestjs/common";

class Dto {
  @ApiProperty()
  startWithCapital: string;
  @ApiProperty()
  camelCase: string;
  @ApiProperty()
  snakeCase: string;
}

class NestedDto {
  @ApiProperty()
  startWithCapital: string;
  @ApiProperty()
  camelCase: string;
  @ApiProperty()
  snakeCase: string;
  @ApiProperty()
  nested: Dto;
}

@Controller("test")
@ApiTags("test Api")
export class AppController {
  /* 
  '{
    "StartWithCapital": "string",
    "camelCase": "string",
    "snake_case": "string",
    "nested": {
      "StartWithCapital": "string",
      "camelCase": "string",
      "snake_case": "string"
    }
  }'
   * */
  @Post()
  async myController(@Body() dto: NestedDto): Promise<NestedDto> {
    const res = new NestedDto();
    res.startWithCapital = dto.startWithCapital;
    res.camelCase = dto.camelCase;
    res.snakeCase = dto.snakeCase;
    const nested = new Dto();
    nested.startWithCapital = dto.nested.startWithCapital;
    nested.camelCase = dto.nested.camelCase;
    nested.snakeCase = dto.nested.snakeCase;
    res.nested = nested;
    return res;
  }
}
