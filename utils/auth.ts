
export interface CredentialsInterface {
    usermail: string;
    password: string;
  }

export function isCredentials(arg: any): arg is CredentialsInterface {
    return arg && arg.usermail && arg.password;
}

export interface LoginResponseInterface {
    access_token: string;
}

export function isLoginResponse(arg: any): arg is LoginResponseInterface {
    console.log(arg);
    return arg && arg.access_token && arg.user;
}

export interface JwtPayloadInterface {
    sub: string;
}

export function isJwtPayload(arg: any): arg is JwtPayloadInterface {
    return arg && arg.sub;
}