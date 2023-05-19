import { User } from "./user";

export interface Category {
    _id: string;
    timeCreated: Date;
    user: User;
    name: string;
}
