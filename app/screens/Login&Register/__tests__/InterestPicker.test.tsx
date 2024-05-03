import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import InterestPicker from '../InterestPicker';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from '@/context/store';


// Mock axios and other dependencies
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('supertokens-react-native', () => ({
  addAxiosInterceptors: jest.fn(),
}));

describe('InterestPicker', () => {
  const setUp = () => (
    <Provider store={store}>
      <InterestPicker />
    </Provider>
  );

  // Test: Rendering the Screen
  it('renders the InterestPicker correctly', () => {
    const { getByText, queryByTestId } = render(setUp());
  
    // Check for header title
    expect(getByText('Pick your interests')).toBeTruthy();
  
    // The activity indicator should not be visible if isLoading is false
    expect(queryByTestId('activity-indicator')).toBeNull();
  });
  // ... any other tests specific to your component
});