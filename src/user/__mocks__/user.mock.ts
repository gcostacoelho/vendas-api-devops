import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/userType.enum";


export const userEntityMock: UserEntity = {
    cpf: "152.665.456-89",
    createdAt: new Date(),
    email: "fabio@teste.com",
    id: 4,
    name: "nameMock",
    password: "password",
    phone: "11 9 4158-9862",
    typeUser: UserType.User,
    updatedAt: new Date(),
}