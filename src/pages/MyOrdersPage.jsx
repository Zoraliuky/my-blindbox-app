    import React, { useState, useEffect, useContext } from 'react';
    import axios from 'axios';
    import { AuthContext } from '../context/AuthContext';
    import { Link } from 'react-router-dom';

    function MyOrdersPage() {
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const { user } = useContext(AuthContext);

      useEffect(() => {
        if (user) {
          const fetchOrders = async () => {
            try {
              // 使用当前登录用户的 ID 去请求订单数据
              const response = await axios.get(`http://127.0.0.1:7001/api/order?userId=${user.id}`);
              setOrders(response.data);
            } catch (error) {
              console.error("获取订单失败", error);
            } finally {
              setLoading(false);
            }
          };
          fetchOrders();
        } else {
          setLoading(false);
        }
      }, [user]); // 当 user 状态变化时，重新获取订单

      if (loading) return <div className="text-center p-8">加载订单中...</div>;

      return (
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">我的订单</h1>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <div>
                    <p className="font-semibold text-lg">{order.blindBox.name}</p>
                    <p className="text-sm text-gray-500">订单时间: {new Date(order.createTime).toLocaleString()}</p>
                  </div>
                  <p className="font-bold text-xl text-indigo-600">¥{parseFloat(order.blindBox.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>您还没有任何订单。快去 <Link to="/" className="text-indigo-600 hover:underline">商店</Link> 逛逛吧！</p>
          )}
        </div>
      );
    }

    export default MyOrdersPage;
    