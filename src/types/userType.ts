export interface UserType {
    id: string;
    email: string;
    password: string;
    name: string;
    role: "admin" | "customer";
    avatar: string;
}
