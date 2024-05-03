import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GetActiveIDState = {
    activeId: string | number | null;
}

const initialState: GetActiveIDState = {
    activeId: null
};

const GetActiveID = createSlice({
    name: "GetActiveID",
    initialState,
    reducers: {
        setActiveId: (state, action: PayloadAction<string>) => {
            state.activeId = action.payload;
        }
    }
});

export const { setActiveId } = GetActiveID.actions;
export default GetActiveID.reducer;
