interface IUser {
    name: string;
    lastName: string;
    company: string;
    email: string;
}


export type User = Readonly<IUser>;