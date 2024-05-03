import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfilePic from '../profilepic/ProfilePic'; // Adjust the import path as necessary
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Create a mock store
// Mock only the necessary modules
jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(),
    requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    CameraType: {
      back: 'back', // Mocked value
      front: 'front' // Mocked value
    },
}));

const mockStore = configureStore();
const store = mockStore({
  // ... initial mock state ...
});

describe('Profile', () => {
  it('renders correctly with an image', () => {
    const mockImage = { uri: 'file.jpg',
                        storageURL: 'http://example.com/image.jpg' };
    
    // Wrap your component in the Provider with the mock store
    const { getByTestId } = render(
      <Provider store={store}>
        <ProfilePic image={mockImage} />
      </Provider>
    );

    const image = getByTestId('profile-image');
    expect(image.props.source.uri).toBe(mockImage.uri);
    //expect(image.props.source.storageURL).toBe(mockImage.storageURL);
  });

  it('shows upload modal when edit icon is pressed', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <ProfilePic />
      </Provider>
    );
  
    const editButton = getByTestId('edit-button');
    fireEvent.press(editButton);
  
    const modalText = getByText('Username'); // Replace with actual text from your modal
    expect(modalText).toBeTruthy();
  });

  // Other tests...
});