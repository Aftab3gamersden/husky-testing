import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Image {
  uri: string;
  storageURL: string
  type?: string; // image or video
}

interface ImageState {
  image: Image | null;
}

const initialState: ImageState = {
  image: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<Image>) => {
      state.image = action.payload;
    },
  },
});

// Update RootState if it's defined elsewhere or define it here
interface RootState {
  image: ImageState;
}

// Selector to get the entire Image object
export const selectImage = (state: RootState) => state.image.image;
export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;