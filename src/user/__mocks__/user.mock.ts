import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/userType.enum";


export const userEntityMock: UserEntity = {
    cpf: "152.665.456-89",
    createdAt: new Date(),
    email: "fabio@teste.com",
    id: 4,
    name: "nameMock",
    password: "$2b$10$9HETNXIilZKw7LWSBuI/oOlZ.//7TehJQ6UI3FkAC.MZWXlnw9NmO",
    phone: "11 9 4158-9862",
    typeUser: UserType.User,
    updatedAt: new Date(),
}