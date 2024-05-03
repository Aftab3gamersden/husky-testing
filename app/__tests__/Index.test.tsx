// Index.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../index';
import { useAuth, AuthContextType } from '@/context/auth/AuthContext';

jest.mock('../../context/auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mocking useAuth for different scenarios
const mockUseAuth = useAuth as jest.Mock<AuthContextType>;

/*
const MockRedirect = ({ href }: { href: string }) => <Text>Redirect to {href}</Text>;

jest.mock('expo-router', () => ({
    ...jest.requireActual('expo-router'),
    Redirect: MockRedirect, // Mock implementation
}));
*/

describe('Index Component', () => {
  it('renders loading indicator while authentication status is being checked', () => {
    mockUseAuth.mockReturnValue({ isLoggedIn: false, isLoading: true });

    const { getByTestId } = render(<Index />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
