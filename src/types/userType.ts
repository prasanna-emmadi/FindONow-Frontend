export interface UserType {
    _id: string;
    email: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
    avatar: string;
}
