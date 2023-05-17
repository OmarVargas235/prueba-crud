import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/bootstrap.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthProvider from './auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Provider>
    </React.StrictMode>,
)
