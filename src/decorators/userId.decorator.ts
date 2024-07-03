import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { stringJwtToLoginPayload } from "../utils/base64Converter";

export const UserId = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const { authorization } = ctx.switchToHttp().getRequest().headers;

        const loginPayload = stringJwtToLoginPayload(authorization);

        return loginPayload?.id;
    }
  );