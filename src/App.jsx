import React from 'react';
// 1. 从 react-router-dom 中导入 Routes 和 Route 这两个组件
import { Routes, Route } from 'react-router-dom';

// 2. 导入我们刚刚创建的页面组件
import BlindBoxList from './pages/BlindBoxList';
import BlindBoxDetail from './pages/BlindBoxDetail';

function App() {
  return (
    <div>
      {/* 3. Routes 组件是所有路由规则的容器 */}
      <Routes>
        {/* 4. 定义第一条规则：
          - path="/" 表示网站的根路径（首页）
          - element={<BlindBoxList />} 表示当访问根路径时，渲染 BlindBoxList 组件
        */}
        <Route path="/" element={<BlindBoxList />} />

        {/* 5. 定义第二条规则：
          - path="/box/:id" 表示一个动态路径，:id 是一个占位符，可以匹配任何字符串
          - 例如 /box/1, /box/abc 都能匹配到这条规则
          - element={<BlindBoxDetail />} 表示当访问这类路径时，渲染 BlindBoxDetail 组件
        */}
        <Route path="/box/:id" element={<BlindBoxDetail />} />
      </Routes>
    </div>
  );
}

export default App;
