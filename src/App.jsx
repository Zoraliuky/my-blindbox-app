import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. 从 @mui/material 导入 ThemeProvider, createTheme 和 CssBaseline
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 导入我们所有的组件和页面
import Navbar from './components/Navbar';
import BlindBoxList from './pages/BlindBoxList';
import BlindBoxDetail from './pages/BlindBoxDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

// 2. 创建一个默认的 MUI 主题
const theme = createTheme();

function App() {
  return (
    // 3. 用 ThemeProvider 包裹所有内容，并将我们创建的 theme 传入
    <ThemeProvider theme={theme}>
      {/* 4. CssBaseline 组件必须放在 ThemeProvider 之后，它会进行样式重置 */}
      <CssBaseline />
      
      <div>
        <Navbar />
        <main>
          <Routes>
            {/* 公共路由 */}
            <Route path="/" element={<BlindBoxList />} />
            <Route path="/box/:id" element={<BlindBoxDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />

            {/* 管理员专属的受保护路由 */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
