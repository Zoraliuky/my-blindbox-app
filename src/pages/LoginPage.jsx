    import React, { useState, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { AuthContext } from '../context/AuthContext';

    function LoginPage() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const navigate = useNavigate();
      const { login } = useContext(AuthContext);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
          const response = await axios.post('http://127.0.0.1:7001/api/user/login', {
            username,
            password,
          });
          login(response.data.data); // 调用全局 login 方法
          navigate('/'); // 登录成功后跳转到首页
        } catch (err) {
          setError('用户名或密码错误，请重试。');
        }
      };

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">登录</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              登录
            </button>
          </form>
        </div>
      );
    }

    export default LoginPage;
    