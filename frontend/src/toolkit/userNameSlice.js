import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName : '',
    lastName : '',
}

const userSlice = createSlice({
    name : 'userName',
    initialState,
    reducers : {
        setUserName : (state, action) => {
            state.firstName = action.payload.firstname;
            state.lastName = action.payload.lastname;
        },
        
    }
})

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;