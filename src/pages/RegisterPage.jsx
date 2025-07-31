import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. 导入 Link 组件
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://127.0.0.1:7001/api/user/register', {
        username,
        password,
        email,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '注册失败，请重试。');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">注册</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">用户名</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">邮箱</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">密码</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          注册
        </button>

        {/* 2. 新增的切换链接 */}
        <p className="text-center text-sm text-gray-600 mt-4">
          已经有账户了？{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            前往登录
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
