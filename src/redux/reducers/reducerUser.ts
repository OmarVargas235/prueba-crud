import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../helpers/interface';

const initialState: User = {
    _id: '',
    company: '',
    email: '',
    lastName: '',
    name: '',
    role: 'USER'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => ({
            ...payload,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;