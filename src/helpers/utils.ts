import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { setIsActiveAlert, setIsAlertSuccess, setIsAlertWarning, setMessageAlert } from '../redux/reducers/reducerAlert';

interface Alert {
    dispatch: Dispatch<AnyAction>;
    isAlertSuccess: boolean;
    isAlertWarning?: boolean;
    message: string;
}

export const validateEmail = (email: string): boolean => {

    return (/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i).test(email);
}

export const alert = ({ dispatch, isAlertSuccess, message, isAlertWarning=false }: Alert): void => {

    dispatch(setIsActiveAlert(true));
    dispatch(setIsAlertSuccess(isAlertSuccess));
    dispatch(setIsAlertWarning(isAlertWarning));
    dispatch(setMessageAlert(message));
}