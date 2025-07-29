import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. 从 react-router-dom 库中导入 BrowserRouter 组件
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. 用 BrowserRouter 把 App 组件包裹起来 */}
    {/* 这样，App 组件以及它的所有子组件就都具备了路由功能 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
