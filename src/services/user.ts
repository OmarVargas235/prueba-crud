import axios, { AxiosError, AxiosResponse } from 'axios';

import { User as IUser } from '../helpers/interface';
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

	public registerUser = async (body: BodyRegister): Promise<Response<string>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${ednpoint}/createUser`, body)
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

	public getUsers = async (): Promise<Response<IUser[]>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${ednpoint}/admin_list_active_users`, {})
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data } = resp as Response<IUser[]>;
					resolve({ data, message: '', status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public deleteUser = async (id: string): Promise<Response<string>> => {

		return await new Promise((resolve) => {
			axios
				.delete(`${ednpoint}/admin_delete_user?id=${id}`, {})
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data } = resp as Response<string>;
					resolve({ data, message: data ?? '', status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};
}

export const user = new User();