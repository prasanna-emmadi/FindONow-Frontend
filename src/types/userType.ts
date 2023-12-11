export interface UserType {
    id: string;
    email: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
    avatar: string;
}
