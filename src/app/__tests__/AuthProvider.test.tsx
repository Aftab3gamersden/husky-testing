// AuthProvider.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import SuperTokens from 'supertokens-react-native';
import { AuthProvider , useAuth } from '@/context/auth/AuthContext';

jest.mock('supertokens-react-native', () => ({
  doesSessionExist: jest.fn(),
  init: jest.fn(),
}));

const MockComponent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return <Text>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</Text>;
};

describe('AuthProvider', () => {
    it('sets isLoggedIn to true when session exists', async () => {
        (SuperTokens.doesSessionExist as jest.Mock).mockResolvedValue(true);
        const { getByText } = render(
            <AuthProvider>
                <MockComponent />
            </AuthProvider>
        );
      
        await waitFor(() => {
            expect(getByText('Logged In')).toBeTruthy();
        });
    });

    it('sets isLoggedIn to false when session does not exist', async () => {
        (SuperTokens.doesSessionExist as jest.Mock).mockResolvedValue(false);
        const { getByText } = render(
            <AuthProvider>
              <MockComponent />
            </AuthProvider>
        );
          
        await waitFor(() => {
            expect(getByText('Not Logged In')).toBeTruthy();
        });          
    });
});