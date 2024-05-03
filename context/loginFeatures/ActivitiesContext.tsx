import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Activity {
    ActivityID: number;
    ActivityName: string;
    ActivityIcon: string;
    isSelected?: boolean; // Optional isSelected property
}

interface ActivitiesContextType {
  selectedActivities: Activity[]; // Replace `Activity` with the correct type for your activities
  setSelectedActivities: (activities: Activity[]) => void;
  hasCalledUserActivitiesApi: boolean; // flag to indicate if user activities API has been called
  setHasCalledUserActivitiesApi: (hasCalled: boolean) => void; // function to update the flag
}

interface ActivitiesProviderProps {
  children: ReactNode;
}

// Provide a default value that matches the shape of your context value
const defaultValue: ActivitiesContextType = {
  selectedActivities: [],
  setSelectedActivities: () => {},
  hasCalledUserActivitiesApi: false, // default value for the flag
  setHasCalledUserActivitiesApi: () => {}, // default function for updating the flag
};

const ActivitiesContext = createContext<ActivitiesContextType>(defaultValue);

export const useActivities = () => useContext(ActivitiesContext);

export const ActivitiesProvider: React.FC<ActivitiesProviderProps> = ({ children }) => {
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [hasCalledUserActivitiesApi, setHasCalledUserActivitiesApi] = useState<boolean>(false);

  const value = {
    selectedActivities,
    setSelectedActivities,
    hasCalledUserActivitiesApi,
    setHasCalledUserActivitiesApi,
  };

  return <ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>;
};