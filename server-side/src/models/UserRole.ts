//! ERASE THIS FILE 
export class UserRole {
    userRoleId: number;
    userRole: string;

    static from(obj: UserRoleRow): UserRole {
        const userRole = new UserRole(
            obj.user_role_id,
            obj.user_role
        );
        return userRole;
    }

    constructor(userRoleId: number, userRole: string) {
        this.userRoleId = userRoleId;
        this.userRole = userRole;
    }
}

export interface UserRoleRow {
    user_role_id: number;
    user_role: string;
}

