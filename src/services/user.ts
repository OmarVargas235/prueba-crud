import axios, { AxiosError, AxiosResponse } from 'axios';

import { Response } from './interfaces';
import { generateError } from './utils';

const ednpoint = 'users';

interface BodyRegister {
    name: string;
    lastName: string;
    email: string;
    company: string;
    password: string;
    repeatPassword: string;
}

class User {

    private setDefaultHeader(): void {

        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    }

    public register = async (body: BodyRegister): Promise<Response<null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${ednpoint}`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<null>;

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};
}

export const dataUser = new User();