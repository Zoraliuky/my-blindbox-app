    import React, { useContext } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext';
    import { Button } from '@mui/material'; // 导入MUI按钮

    function Navbar() {
      const { isAuthenticated, user, logout } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        navigate('/');
      };

      return (
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              盲盒商店
            </Link>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* 如果是管理员，就显示管理后台链接 */}
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-gray-700 hover:text-indigo-600 font-semibold">
                      管理后台
                    </Link>
                  )}
                  <Link to="/my-orders" className="text-gray-700 hover:text-indigo-600">
                    我的订单
                  </Link>
                  <span className="text-gray-500">欢迎, {user.nickname || user.username}!</span>
                  <Button variant="outlined" color="secondary" size="small" onClick={handleLogout}>
                    登出
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                    登录
                  </Link>
                  <Button component={Link} to="/register" variant="contained" color="primary">
                    注册
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      );
    }

    export default Navbar;
    