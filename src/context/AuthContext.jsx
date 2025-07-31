import React, { createContext, useState } from 'react';

// 1. 创建一个新的 Context 对象
export const AuthContext = createContext(null);

// 2. 创建一个 Provider 组件
//    这个组件将包裹我们的整个应用，为所有子组件提供 value 中定义的数据和方法
export const AuthProvider = ({ children }) => {
  // 3. 使用 useState 来存储当前登录的用户信息
  const [user, setUser] = useState(null);

  // 4. 登录函数：接收用户信息并存入 state
  const login = (userData) => {
    setUser(userData);
  };

  // 5. 登出函数：将用户信息清空
  const logout = () => {
    setUser(null);
  };

  // 6. 将 user state 和 login/logout 方法通过 value 传递下去
  const value = {
    user,
    isAuthenticated: !!user, // 一个布尔值，方便判断是否已登录
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
