interface IUser {
    name: string;
    lastName: string;
    company: string;
    email: string;
    role: 'USER' | 'ADMIN';
    _id: string;
}

interface IDataTable extends IUser {

}

export type DataTable = Readonly<IDataTable>;
export type User = Readonly<IUser>;