/* eslint-disable react/display-name */
import React from 'react';
import { render,  screen } from '@testing-library/react-native';
import { useGetExperienceQuery } from '@/context/exploreContext/ExploreContext';
import { useAppDispatch , useAppSelector } from '@/context/hooks';
import Explore from '../(auth)/(tabs)/Explore';

// Mocking the hooks
jest.mock('../../context/exploreContext/ExploreContext', () => ({
 useGetExperienceQuery: jest.fn(),
}));

jest.mock('../../context/hooks', () => ({
 useAppSelector: jest.fn(),
 useAppDispatch: jest.fn(),
}));

// Mocking the components
jest.mock('../../components/Explore/ShortVideo', () => () => <></>);


describe('Explore', () => {
    beforeEach(() => {
       (useGetExperienceQuery as jest.Mock).mockClear();
       (useAppSelector as jest.Mock).mockClear();
       (useAppDispatch as jest.Mock).mockClear();
    });
   
    it('renders loading indicator when data is loading', () => {
       (useGetExperienceQuery as jest.Mock).mockReturnValue({ isLoading: true, isError: false });
       render(<Explore />);
       expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    });
   
    it('renders error message when there is an error', () => {
       (useGetExperienceQuery as jest.Mock).mockReturnValue({ isLoading: false, isError: true });
       render(<Explore />);
       expect(screen.getByTestId('error-message')).toBeTruthy();
    });
   
   });