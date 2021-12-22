import React from 'react';

export interface ThemeContextState {
  darkTheme: boolean;
  toggleTheme: (value: boolean) => void;
}

export const ThemeContext = React.createContext<ThemeContextState>({
  darkTheme: false,
  toggleTheme: () => {},
});
