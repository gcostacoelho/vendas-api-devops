import { userEntityMock } from "../../user/__mocks__/user.mock";
import { LoginDto } from "../dtos/login.dto";

export const loginMock: LoginDto = {
    email: userEntityMock.email,
    password: "123"
}