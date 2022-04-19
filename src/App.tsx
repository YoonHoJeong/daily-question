import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './hooks/useAuth';
import Router from './routes/Router';
import GlobalStyle from './assets/css/GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { GlobalPortal } from './components/layouts/GlobalPortal';

interface Props {}

export const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={{ palette }}>
        <GlobalStyle />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <GlobalPortal.Provider>
              <Router />
            </GlobalPortal.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

const palette = {
  white: '#FFFFFF',
  blue: '#515FA9',
  black: '#4D4D4D',
  grey: '#CCCCCC',
  bgGrey: '#F2F2F2',
  bgGrey2: '#E5E5E5',
  deepGrey: '#888888',
  red: '#FF7676',
};

export default App;
