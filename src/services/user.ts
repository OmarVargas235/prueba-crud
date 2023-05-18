import axios, { AxiosError, AxiosResponse } from 'axios';

import { Response } from './interfaces';
import { generateError } from './utils';

const ednpoint = '/api';

interface BodyRegister {
    name: string;
    lastName: string;
    email: string;
    company: string;
    password: string;
}

class User {

    private setDefaultHeader(): void {

        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    }

    public registerUserAdmin = async (body: BodyRegister): Promise<Response<string>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${ednpoint}/createUserWithOutToken`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data } = resp as Response<string>;
					resolve({ data: null, message: data ?? '', status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};
}

export const user = new User();