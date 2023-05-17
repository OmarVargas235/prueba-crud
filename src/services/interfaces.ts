const status = [200, 201, 400, 401, 403, 404, 415, 500, 502, 504] as const;

export type Status = typeof status[number];

interface IResponse<T> {
    status: Status;
    data: T | null;
    message: string;
    messages?: string;
}

interface IResponsePaginate<T> {
    status: Status;
    data: T | null;
    message: string;
    total: number;
}

export type Response<T> = Readonly<IResponse<T>>;
export type ResponsePaginate<T> = Readonly<IResponsePaginate<T>>;