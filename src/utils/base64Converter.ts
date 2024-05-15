import { LoginPaylod } from "src/auth/dtos/loginPayload.dto"


export const stringJwtToLoginPayload = (authorization: string): LoginPaylod | undefined => {
    const authorizationSplited = authorization.split('.');

    if (authorizationSplited.length < 3 || !authorizationSplited[1]){
        return undefined;
    }

    const login: LoginPaylod = JSON.parse(Buffer.from(authorizationSplited[1], 'base64').toString('ascii'));

    return login;

}