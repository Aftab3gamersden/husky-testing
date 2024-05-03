import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '@/context/store';
import Login from '../login';

// Mock axios to prevent actual network requests
jest.mock('axios');

jest.mock('supertokens-react-native', () => ({
  // Mock the methods or properties you use from the module
  addAxiosInterceptors: jest.fn(),
  // ... other methods or properties as needed
}));

describe('Login Screen', () => {
  const component = (
    <Provider store={store}>
      <Login />
    </Provider>
  );

  it('renders correctly', () => {
    const { getByText } = render(component);
    
    // Check if the main elements are rendered
    expect(getByText('Email or Phone number')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
    // Note: Adjust the checks to match the actual text and elements in your component
    // Add more checks as needed
  });

  it('updates input value on change for email', () => {
    const { getByTestId } = render(component);
    const emailInput = getByTestId('email-input'); // Ensure your TextInput has testID="email-input"

    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
    // Add more checks as needed
  });

  // Note: You'll need a similar test for the PhoneInput, but handling it may be more complex 
  // due to the nature of the component. You might need to mock the PhoneInput component 
  // or find a way to interact with it in your tests.

  // Add more tests for button interaction, form submission, etc.
});