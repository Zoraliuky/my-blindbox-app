import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function BlindBoxDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [box, setBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoxDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:7001/api/blind-box/${id}`);
        setBox(response.data);
      } catch (err) {
        setError('加载盲盒详情失败，该商品可能不存在。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxDetail();
  }, [id]);

  const handleDraw = async () => {
    if (!isAuthenticated) {
      alert('请先登录后再进行抽盒！');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:7001/api/order/draw', {
        userId: user.id,
        blindBoxId: box.id,
      });
      alert('恭喜你，抽盒成功！');
      navigate('/my-orders');
    } catch (error) {
      alert('抽盒失败，请稍后再试。');
      console.error("抽盒失败", error);
    }
  };

  if (loading) {
    return <div className="text-center p-10">正在加载详情...</div>;
  }

  if (error || !box) {
    return <div className="text-center p-10 text-red-500">{error || '找不到该盲盒。'}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* 左侧：图片 */}
          <div className="md:w-1/2">
            <img
              src={box.imageUrl || `https://placehold.co/600x600/e2e8f0/334155?text=${box.name}`}
              alt={box.name}
              className="h-full w-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x600/e2e8f0/334155?text=图片加载失败`; }}
            />
          </div>

          {/* 右侧：信息和操作 */}
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              {/* 返回按钮 */}
              <button
                onClick={() => navigate(-1)}
                className="text-indigo-600 hover:text-indigo-800 mb-4 text-sm"
              >
                &larr; 返回列表
              </button>

              <h1 className="text-3xl font-bold text-gray-900">{box.name}</h1>
              <p className="mt-2 text-gray-600">{box.description}</p>
            </div>

            <div className="mt-8">
              <p className="text-4xl font-extrabold text-gray-900">
                ¥{parseFloat(box.price).toFixed(2)}
              </p>
              <button
                onClick={handleDraw}
                className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
              >
                立即抽取
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlindBoxDetail;
