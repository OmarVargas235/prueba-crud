import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../helpers/interface';

type TypeAction = 'CREATE' | 'EDIT';

export interface IInitState {
    isActive: boolean;
    type: TypeAction;
    updateTable: boolean;
    user: User;
}

const initialState: IInitState = {
    isActive: false,
    type: 'CREATE',
    updateTable: false,
    user: {
        _id: '', company: '',
        email: '', lastName: '',
        name: '', role: 'USER',
    }
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
        setDataModalUser: (state, { payload }: PayloadAction<User>) => ({
            ...state,
            user: payload
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setOpenModalUser, setDataModalUser } = openModalUserSlice.actions;

export default openModalUserSlice.reducer;