import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitState {
    isActive:boolean;
}

const initialState: IInitState = {
    isActive: false,
}

export const blockUISlice = createSlice({
    name: 'blockUI',
    initialState,
    reducers: {
        setIsActiveLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isActive: payload,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setIsActiveLoading } = blockUISlice.actions;

export default blockUISlice.reducer;