/* istanbul ignore file */
//! ERASE THIS FILE 
export class User {
    ersUserId: number;
    ersUsername: string;
    ersPassword: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userRoleId: number;

    static from(obj: UserRow): User {
        const user = new User(
            obj.ers_user_id,
            obj.ers_username,
            obj.ers_password,
            obj.user_first_name,
            obj.user_last_name,
            obj.user_email,
            obj.user_role_id
        );
        return user;
    }

    constructor(ersUserId: number,
        ersUsername: string,
        ersPassword: string,
        userFirstName: string,
        userLastName: string,
        userEmail: string,
        userRoleId: number
    ) {
        this.ersUserId = ersUserId;
        this.ersUsername = ersUsername;
        this.ersPassword = ersPassword;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.userRoleId = userRoleId;
    }
}

export interface UserRow {
    ers_user_id: number;
    ers_username: string;
    ers_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_role_id: number;
}

