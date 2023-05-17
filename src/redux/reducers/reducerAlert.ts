import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInitState {
    isActive:boolean;
    isAlertSuccess: boolean;
    isAlertWarning: boolean;
    messageAlert: string;
}

const initialState: IInitState = {
    isActive: false,
    isAlertSuccess: false,
    isAlertWarning: false,
    messageAlert: '',
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setIsActiveAlert: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isActive: payload,
        }),
        setIsAlertSuccess: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isAlertSuccess: payload,
        }),
        setMessageAlert: (state, { payload }: PayloadAction<string>) => ({
            ...state,
            messageAlert: payload,
        }),
        setIsAlertWarning: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isAlertWarning: payload,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setIsActiveAlert, setIsAlertSuccess, setMessageAlert, setIsAlertWarning } = alertSlice.actions;

export default alertSlice.reducer;