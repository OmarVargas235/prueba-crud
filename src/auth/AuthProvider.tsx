// 1.- librerias
import { useState, useEffect, useCallback, createContext } from 'react';
import { useDispatch } from 'react-redux';

// 2.- components
import Loader from '../layauts/spinner/Spinner';

// 3.- interfaces
import { Props, SubmitLogin } from './interface';
import { Response } from '../services/interfaces';
import { User } from '../helpers/interface';

// 4.- services
import { auth, Event } from '../services/auth';

// 5.- utils
import { alert } from '../helpers/utils';

// 6.- redux
import { setIsActiveLoading } from '../redux/reducers/reducerBlockUI';
import { setUser } from '../redux/reducers/reducerUser';

export interface AuthContextInterface {
	isAuth: boolean;
	submitLogin: ({ email, password }: SubmitLogin) => Promise<Response<User>>;
	setIsAuth: (v: boolean) => void;
}

export const AuthContext = createContext<AuthContextInterface>(
	{} as AuthContextInterface
);

const AuthProvider = ({ children }: Props): JSX.Element => {

	const dispatch = useDispatch();

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): void => {

		Promise.all([
			jwtCheck(),
		]).finally(() => setLoading(false));

	}, []);

    const jwtCheck = useCallback(async (): Promise<void> => {

		return await new Promise(resolve => {

			auth.init();

			const event: Event = auth.getEvent();

			if (event === 'onAutoLogin') {

				dispatch(setIsActiveLoading(true));

				// setIsAuth(true);
				// auth.signInWithToken()
				// 	.then(resp => {

				// 		if (resp.data === null) return;

				// 		dispatch(setUser({
				// 			...resp.data,
				// 			img: resp.data.img === 'null' ? null : resp.data.img
				// 		}));
				// 	})
				// 	.catch(err => alert({ dispatch, isAlertSuccess: false, message: err.message }))
				// 	.finally(() => dispatch(setIsActiveLoading(false)));

				resolve();

			} else if (event === 'onAutoLogout') {

				setIsAuth(false);
				resolve();

			} else if (event === 'onNoAccessToken') {

				setIsAuth(false);
				resolve();
			}
		});

	}, []);

	const submitLogin =
		async ({ email, password }: SubmitLogin): Promise<Response<User>> => {

			return await auth
				.signIn(email, password)
				.then((data) => {

					void jwtCheck();
					return data;
				})
				.catch((err) => {

					return err;
				});
		};
	
    return <AuthContext.Provider value={{
        isAuth,
		submitLogin,
		setIsAuth,
    }}>
        { loading ? <Loader isLoading={true} /> : children }
    </AuthContext.Provider>;
}

export default AuthProvider;