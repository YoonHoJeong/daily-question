import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './hooks/useAuth';
import Router from './routes/Router';
import GlobalStyle from './assets/css/GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { GlobalPortal } from './components/layouts/GlobalPortal';
import colors from './constants/colors';

interface Props {}

export const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={{ palette: colors }}>
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

export default App;
