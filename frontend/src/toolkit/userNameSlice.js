import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData : {},
}

const userSlice = createSlice({
    name : 'userName',
    initialState,
    reducers : {
        setUserData : (state, action) => {
            state.userData = action.payload.userData;
        },
        
    }
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;