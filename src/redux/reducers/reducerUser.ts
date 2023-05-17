import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../helpers/interface';

export interface IInitState {
    user: User;
}

const initialState: IInitState = {
    user: {
        email: '', img: null,
        lastName: '', name: '',
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => ({
            user: payload,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;