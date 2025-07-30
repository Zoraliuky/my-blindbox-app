import { useState, useEffect } from 'react';
// 1. 从 react-router-dom 中导入 useParams 和 useNavigate 这两个新的 Hook。
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlindBoxDetail() {
  // 2. 调用 useParams() Hook，它会返回一个包含 URL 参数的对象。
  //    - 因为我们在 App.jsx 中定义的路由是 /box/:id，所以这个对象会是 { id: '...' } 的形式。
  //    - 我们用解构赋值直接获取到 id 的值。
  const { id } = useParams();

  // 3. 调用 useNavigate() Hook，它会返回一个函数，我们可以用它来手动跳转页面。
  const navigate = useNavigate();

  // 4. 和列表页一样，我们需要 state 来存储数据、加载状态和错误信息。
  const [box, setBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 5. 使用 useEffect 来根据 id 获取单个盲盒的数据。
  useEffect(() => {
    const fetchBoxDetail = async () => {
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
  }, [id]); // 6. 依赖项数组中放入 `id`，表示当 URL 中的 id 变化时，这个 effect 需要重新执行。

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
            />
          </div>

          {/* 右侧：信息和操作 */}
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              {/* 返回按钮 */}
              <button
                // 7. 点击时，调用 navigate(-1) 返回上一个页面。
                onClick={() => navigate(-1)}
                className="text-indigo-600 hover:text-indigo-800 mb-4"
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
              <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors">
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
