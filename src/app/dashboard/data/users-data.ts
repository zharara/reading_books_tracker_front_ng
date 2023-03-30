export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export const Users: User[] = [
    {
        id: 1,
        firstName: 'Zakaria',
        lastName: 'Harara',
        email: 'zak98h@gmail.com',
        phone: '0592763545',
        password: '123456'
    },
    {
        id: 1,
        firstName: 'Ahmad',
        lastName: 'Ahmad',
        email: 'ahmad@gmail.com',
        phone: '059999999',
        password: '123456'
    },
] 