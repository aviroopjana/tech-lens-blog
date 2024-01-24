import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
    currentUser: ApiResponse | null,
    error: string| null,
    loading: boolean
}

// export interface ApiResponse {
//     success: boolean,
//     message: string
// }

export interface ApiResponse {
    createdAt: string;
    email: string;
    profilePicture: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
}

const initialState: userState = {
    currentUser: null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action: PayloadAction<ApiResponse>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;