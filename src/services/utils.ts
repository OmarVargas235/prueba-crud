import { AxiosResponse } from 'axios';
import { Response } from './interfaces';

export const generateError = (resp: AxiosResponse | null): Response<null>  => {

    if (resp === null) {

        const error = new Error(JSON.stringify({ data: null, message: 'Ha ocurrido un problema', status: "" }));
        return JSON.parse(error.message);
    }

    const { status, error, data } = resp.data;

    const result = status !== 200
        ? { status, message: error, data: null }
        : { status, message: "", data };

    return result;
}