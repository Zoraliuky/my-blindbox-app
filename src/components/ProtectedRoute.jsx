import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// 这个组件会检查用户是否是管理员
const ProtectedRoute = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  // 如果用户未登录，或者登录了但不是管理员，就重定向到首页
  if (!isAuthenticated || user.role !== 'admin') {
    // Navigate 组件会自动跳转到指定路径
    return <Navigate to="/" replace />;
  }

  // 如果是管理员，就正常显示其包裹的子路由页面 (通过 Outlet 组件)
  return <Outlet />;
};

export default ProtectedRoute;
