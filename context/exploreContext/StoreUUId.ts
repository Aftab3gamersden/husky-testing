import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interface for slice state
interface UUIDState {
  UUIDs: string[];
  FollowUUID:string[];
  unfollowUUID:string[];
  removedUUIDs:string[];
}

// Initial state
const initialState: UUIDState = {
  UUIDs: [],
  FollowUUID:[],
  unfollowUUID:[],
  removedUUIDs:[]
};

// Create slice
const UUIDSlice = createSlice({
  name: 'UUID',
  initialState,
  reducers: {
    // Add UUID to the collection
    addUUID: (state, action: PayloadAction<string>) => {
      const uuidToadd = action.payload;
      if(!state.UUIDs.includes(uuidToadd)) {
          state.UUIDs.push(uuidToadd);
      }  
    },
    removeUUID: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.UUIDs = state.UUIDs.filter(uuid => uuid !== uuidToRemove);
      state.removedUUIDs.push(uuidToRemove); // Push removed UUID to removedUUIDs array
    },
    Following: (state, action: PayloadAction<string>) => {
      const uuidToadd = action.payload;
      if(!state.UUIDs.includes(uuidToadd)) {
          state.FollowUUID.push(uuidToadd);
      }  
    },
    UnFollowing: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.UUIDs = state.UUIDs.filter(uuid => uuid !== uuidToRemove);
      state.unfollowUUID.push(uuidToRemove); 
    },
  },
});

// Export actions
export const { addUUID, removeUUID, Following , UnFollowing  } = UUIDSlice.actions;

// Export reducer
export default UUIDSlice.reducer;
