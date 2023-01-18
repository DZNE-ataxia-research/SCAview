import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import routing from './routing';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {routing}
  </ThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
