 import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import { AuthProvider } from './context/AuthContext'; // 1. 导入 AuthProvider
    import App from './App.jsx';
    import './index.css';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <BrowserRouter>
          {/* 2. 用 AuthProvider 包裹 App */}
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );