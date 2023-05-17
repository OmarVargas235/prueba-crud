interface IUser {
    name: string;
    lastName: string;
    company: string;
    email: string;
}

interface IDataTable {
    name: string;
    lastName: string;
    company: string;
    email: string;
}

export type DataTable = Readonly<IDataTable>;
export type User = Readonly<IUser>;