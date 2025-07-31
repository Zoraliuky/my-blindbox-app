import React from 'react';
// 1. 从 react-router-dom 中导入 Routes 和 Route 这两个组件
import { Routes, Route } from 'react-router-dom';

// 2. 导入我们刚刚创建的页面组件
import BlindBoxList from './pages/BlindBoxList';
import BlindBoxDetail from './pages/BlindBoxDetail';
import LoginPage from './pages/LoginPage';
    import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <div>
      {/* 3. Routes 组件是所有路由规则的容器 */}
      <Routes>
            <Route path="/" element={<BlindBoxList />} />
            <Route path="/box/:id" element={<BlindBoxDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
    </div>
  );
}

export default App;
