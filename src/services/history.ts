import axios, { AxiosError, AxiosResponse } from 'axios';

import { Response } from './interfaces';
import { generateError } from './utils';
import { User } from '../helpers/interface';

const ednpoint = '/api';

interface BodyRegister {
    name: string;
    lastName: string;
    email: string;
    company: string;
    password: string;
}

class History {

	public registerUser = async (body: Omit<BodyRegister, 'password'>): Promise<Response<string>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${ednpoint}/createHistory`, body)
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

	public getUsers = async (): Promise<Response<User[]>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${ednpoint}/list_active_history`, {})
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data } = resp as Response<User[]>;
					resolve({ data, message: '', status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};
}

export const history = new History();