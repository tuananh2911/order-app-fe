import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer from './context/reducer';
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('tableId');
if (token) {
  localStorage.setItem('tableId', token);
  // Xóa token khỏi URL
  window.history.replaceState({}, document.title, window.location.pathname);
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
