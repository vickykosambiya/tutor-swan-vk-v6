import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'; // Named import
import { PersistGate } from 'redux-persist/integration/react';
import theme from './theme.js';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
