    import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Navbar from './components/Navbar'; //  导入 Navbar 组件
    import BlindBoxList from './pages/BlindBoxList';
    import BlindBoxDetail from './pages/BlindBoxDetail';
    import LoginPage from './pages/LoginPage';
    import RegisterPage from './pages/RegisterPage';
    import MyOrdersPage from './pages/MyOrdersPage'; // 导入新页面
    function App() {
      return (
        <div>
          <Navbar /> {/* 2. 将 Navbar 放在 Routes 的上方 */}
          <main>
            <Routes>
              <Route path="/" element={<BlindBoxList />} />
              <Route path="/box/:id" element={<BlindBoxDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} /> {/* 添加新路由 */}
            </Routes>
          </main>
        </div>
      );
    }

    export default App;
    