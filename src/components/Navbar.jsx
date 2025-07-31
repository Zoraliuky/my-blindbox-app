import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  // 1. 从全局 AuthContext 中获取用户状态和方法
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 调用全局 logout 方法
    navigate('/'); // 登出后跳转到首页
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* 网站Logo，点击可返回首页 */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          盲盒商店
        </Link>

        <div>
          {/* 2. 根据 isAuthenticated 的值来决定显示什么内容 */}
          {isAuthenticated ? (
            // 如果用户已登录
            <div className="flex items-center space-x-4">
              <Link to="/my-orders" className="text-gray-700 hover:text-indigo-600">
                我的订单
              </Link>
              <span className="text-gray-500">欢迎, {user.nickname || user.username}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                登出
              </button>
            </div>
          ) : (
            // 如果用户未登录
            <div className="space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                登录
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
