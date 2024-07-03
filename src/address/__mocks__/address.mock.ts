import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const addressMock: AddressEntity = {
    cep: '1232011',
    cityId: cityMock.id,
    complement: 'B',
    createdAt: new Date(),
    id: 1516,
    numberAddress: 115,
    updatedAt: new Date(),
    userId: userEntityMock.id
}