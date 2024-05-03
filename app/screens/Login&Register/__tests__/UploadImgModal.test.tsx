import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UploadImgModal from '../profilepic/UploadImgModal'; // Adjust with the correct path
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock only the necessary modules
jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(),
    requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    CameraType: {
      back: 'back', // Mocked value
      front: 'front' // Mocked value
    },
}));

jest.mock('expo-camera', () => ({ Camera: () => 'Camera' }));
jest.mock('expo-media-library', () => ({ saveToLibraryAsync: jest.fn() }));

const mockStore = configureStore();
const store = mockStore({});

describe('UploadImgModal', () => {
    it('renders correctly', () => {
      const setOpenModal = jest.fn(); // Mock function to pass as a prop
      const onImageSelected = jest.fn(); // Mock function for onImageSelected prop
  
      const { getByText } = render(
        <Provider store={store}>
          <UploadImgModal openModal={true} setOpenModal={setOpenModal} onImageSelected={onImageSelected} />
        </Provider>
      );
  
      // Example assertion: Check if a specific text is rendered
      expect(getByText('Camera')).toBeTruthy();
      expect(getByText('Gallery')).toBeTruthy();
    });
    
    it('calls setOpenModal on close button press', () => {
      const setOpenModal = jest.fn();
      const onImageSelected = jest.fn();

      const { getByTestId } = render(
        <Provider store={store}>
          <UploadImgModal openModal={true} setOpenModal={setOpenModal} onImageSelected={onImageSelected} />
        </Provider>
      );

      const closeButton = getByTestId('close-button'); 
      fireEvent.press(closeButton);

      expect(setOpenModal).toHaveBeenCalledWith(false);
    });

    // More tests can be added here to cover other interactions and scenarios
});
