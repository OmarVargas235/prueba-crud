import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TypeAction = 'CREATE' | 'EDIT';

export interface IInitState {
    isActive: boolean;
    type: TypeAction;
    updateTable: boolean;
}

const initialState: IInitState = {
    isActive: false,
    type: 'CREATE',
    updateTable: false,
}

export const openModalUserSlice = createSlice({
    name: 'openModalUser',
    initialState,
    reducers: {
        setOpenModalUser: (state, { payload }: PayloadAction<{ type: TypeAction, isActive: boolean; updateTable?: boolean; }>) => ({
            ...state,
            type: payload.type,
            isActive: payload.isActive,
            updateTable: payload.updateTable ?? false
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setOpenModalUser } = openModalUserSlice.actions;

export default openModalUserSlice.reducer;