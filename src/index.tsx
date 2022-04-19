import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import './index.css';

Sentry.init({
  dsn: 'https://84405297d7df47b18b8c73622700e2a0@o1189345.ingest.sentry.io/6309689',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
