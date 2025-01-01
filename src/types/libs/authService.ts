export interface IUserData {
    username: string;
    password: string;
}

export interface IAuthenticatedUserData {
    secret: string | undefined;
}