import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from '../src/app/App';
import { Provider } from 'react-redux';
import store from './app/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <Provider store={store}>
      <App />
    </Provider>
    </Router>
  </StrictMode>,
);
