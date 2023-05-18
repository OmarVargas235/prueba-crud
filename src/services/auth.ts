import axios, { AxiosError, AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

import { User } from '../helpers/interface';
import { Response } from './interfaces';
import { generateError } from './utils';

interface IToken {
	email: string;
	exp: number;
	iat: number;
}

export type Event = 'onAutoLogin' | 'onAutoLogout' | 'onNoAccessToken' | '';

class Auth {
	private typeEvent: Event = '';

	public init = (): void => {
		this.handleAuthentication();
	};

	private readonly on = (event: Event): void => {
		this.typeEvent = event;
	};

	public getEvent = (): Event => {
		return this.typeEvent;
	};

	public signIn = async (email: string, password: string): Promise<Response<{accessToken: string; user: User;}>> => {

		return await new Promise((resolve) => {
			axios
				.post('/api/login', {
					email,
					password,
				})
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<{accessToken: string; user: User;}>;

					this.setSession(data === null ? null : data.accessToken);
					this.setSessionUser(data === null ? null : data.user);

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {
					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public setSession = (ACCESS_TOKEN: string | null): void => {

		if (ACCESS_TOKEN !== null) {

			window.localStorage.setItem('jwt_access_token', ACCESS_TOKEN);
			axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;

		} else {

			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	public setSessionUser = (user: User | null): void => {

		if (user !== null) {

			window.localStorage.setItem('user', window.JSON.stringify(user));

		} else {

			localStorage.removeItem('user');
		}
	};

	public getAccessToken = (): string => {

		return window.localStorage.getItem('jwt_access_token') ?? '';
	};

	public getUser = (): string => {

		return window.localStorage.getItem('user') ?? '';
	};

	public logout = (): void => {

		this.setSession(null);
		this.setSessionUser(null);
	}

	private readonly handleAuthentication = (): void => {

		const ACCESS_TOKEN = this.getAccessToken();
		const USER = this.getUser();

		if (ACCESS_TOKEN === '' || USER === '') {
			this.on('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(ACCESS_TOKEN)) {

			this.setSession(ACCESS_TOKEN);
			this.on('onAutoLogin');

		} else {

			this.setSession(null);
			this.on('onAutoLogout');
		}
	};

	public isAuthTokenValid = (ACCESS_TOKEN: string): boolean => {

		if (ACCESS_TOKEN === '') return false;

		const decoded: IToken = jwtDecode(ACCESS_TOKEN);

		const currentTime = Date.now() / 1000;

		if (decoded.exp < currentTime) {
            
			console.warn('access token expired');
			return false;
		}

		return true;
	};
}

export const auth = new Auth();