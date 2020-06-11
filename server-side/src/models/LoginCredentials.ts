export class LoginCredentials {
    username: string;
    userPassword: string;
    userRole: string;
    userId: number;

    static from(obj: LoginCredentialsRow): LoginCredentials {
        const loginCredentials = new LoginCredentials(
            obj.ers_username,
            obj.ers_password,
            obj.user_role,
            obj.ers_users_id
        );
        return loginCredentials;
    }

    constructor(username: string, userPassword: string, userRole: string, userId: number) {
        this.username = username;
        this.userPassword = userPassword;
        this.userRole = userRole;
        this.userId = userId;
    }
}

export interface LoginCredentialsRow {
    ers_username: string;
    ers_password: string;
    user_role: string;
    ers_users_id: number;
}