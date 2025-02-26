import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { rawHeaders } = ctx.switchToHttp().getRequest();
    //console.log(rawHeaders);
    return rawHeaders;
  },
);
