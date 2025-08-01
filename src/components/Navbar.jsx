import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// 从 @mui/material 导入 AppBar (应用栏) 相关组件
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
} from '@mui/material';

function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    // AppBar 是 MUI 提供的顶层导航栏容器，自带颜色和阴影
    <AppBar position="static" color="default" elevation={1}>
      {/* Toolbar 用于在横向上排列导航栏内容 */}
      <Toolbar>
        {/* Box sx={{ flexGrow: 1 }} 会占据所有可用空间，把右侧的按钮推到最右边 */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            盲盒商店
          </Typography>
        </Box>

        {isAuthenticated ? (
          // 如果用户已登录
          <>
            {user.role === 'admin' && (
              <Button component={RouterLink} to="/admin" color="inherit">
                管理后台
              </Button>
            )}
            <Button component={RouterLink} to="/my-orders" color="inherit">
              我的订单
            </Button>
            <Typography sx={{ mx: 2 }}>
              欢迎, {user.nickname || user.username}!
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              登出
            </Button>
          </>
        ) : (
          // 如果用户未登录
          <>
            <Button component={RouterLink} to="/login" color="inherit">
              登录
            </Button>
            <Button component={RouterLink} to="/register" variant="contained" color="primary">
              注册
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
