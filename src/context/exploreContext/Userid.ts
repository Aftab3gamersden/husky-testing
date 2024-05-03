import { createSlice } from "@reduxjs/toolkit";

const GetUserID = createSlice({
    name: "GetUserID",
    initialState: {
        UserId: null
    },
    reducers: {
        setUserId: (state, action) => {
            state.UserId = action.payload;
        }
    }
});

export const { setUserId } = GetUserID.actions;
export default GetUserID.reducer;
