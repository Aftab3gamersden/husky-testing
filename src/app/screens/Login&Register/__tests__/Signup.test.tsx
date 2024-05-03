import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { Provider } from 'react-redux';
import Signup from '../Signup';
import * as Location from "expo-location";
import { store } from '@/context/store';

// Mock axios to prevent actual network requests
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('supertokens-react-native', () => ({
  addAxiosInterceptors: jest.fn(),
}));

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getCurrentPositionAsync: jest.fn(),
    reverseGeocodeAsync: jest.fn(),
  }));

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('Signup', () => {
    const setup = () => (
        <Provider store={store}>
          <Signup />
        </Provider>
    );

    it('renders the Signup screen correctly', () => {
        const { getByText, getByTestId } = render(setup());
  
        expect(getByText('Wonderful !')).toBeTruthy();
        expect(getByTestId('username-input')).toBeTruthy();
      });

      it('allows entering a username', () => {
        const { getByTestId } = render(setup());
        const usernameInput = getByTestId('username-input');
      
        fireEvent.changeText(usernameInput, 'testuser');
        expect(usernameInput.props.value).toBe('testuser');
      });

      /*
      it('requests and retrieves location on icon press', async () => {
        Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' });
        Location.getCurrentPositionAsync.mockResolvedValue({ coords: { latitude: 0, longitude: 0 } });
        Location.reverseGeocodeAsync.mockResolvedValue([{ city: 'Test City', country: 'Test Country' }]);
      
        const { getByTestId } = render(setup());
        const locationIcon = getByTestId('location-icon');
      
        fireEvent.press(locationIcon);
      
        await waitFor(() => {
          expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
          // Check if location is set correctly in the state (may require additional setup)
        });
      });
      */
})