import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function BlindBoxDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [box, setBox] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取盲盒详情和评论的函数
  const fetchData = async () => {
    // 在开始获取新数据前，重置状态
    setLoading(true);
    setError(null);
    try {
      // 使用 Promise.all 并行发起两个网络请求，提高效率
      const [boxRes, commentsRes] = await Promise.all([
        axios.get(`http://127.0.0.1:7001/api/blind-box/${id}`),
        axios.get(`http://127.0.0.1:7001/api/comment?blindBoxId=${id}`)
      ]);
      setBox(boxRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      setError('加载数据失败，请检查网络或稍后再试。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 当组件第一次加载或 URL 中的 id 变化时，执行数据获取
  useEffect(() => {
    fetchData();
  }, [id]);

  // 处理抽盒的函数
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

  // 处理发表评论的函数
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert('评论内容不能为空！');
      return;
    }

    if (!isAuthenticated) {
      alert('请先登录后再发表评论！');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:7001/api/comment', {
        userId: user.id,
        blindBoxId: box.id,
        content: newComment,
      });
      setNewComment(''); // 发表成功后清空输入框
      fetchData(); // 重新获取数据以立即显示新评论
    } catch (error) {
      alert('评论失败，请稍后再试。');
      console.error("评论失败", error);
    }
  };

  // --- 根据不同状态显示不同UI ---

  if (loading) {
    return <div className="text-center p-10">正在加载...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!box) {
    return <div className="text-center p-10">找不到该盲盒。</div>;
  }

  // --- 主界面渲染 ---

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* 盲盒详情卡片 */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={box.imageUrl || `https://placehold.co/600x600/e2e8f0/334155?text=${box.name}`}
              alt={box.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <button onClick={() => navigate(-1)} className="text-indigo-600 hover:text-indigo-800 mb-4 text-sm">&larr; 返回列表</button>
              <h1 className="text-3xl font-bold text-gray-900">{box.name}</h1>
              <p className="mt-2 text-gray-600">{box.description}</p>
            </div>
            <div className="mt-8">
              <p className="text-4xl font-extrabold text-gray-900">¥{parseFloat(box.price).toFixed(2)}</p>
              <button onClick={handleDraw} className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors">立即抽取</button>
            </div>
          </div>
        </div>
      </div>

      {/* 玩家秀 (评论区) */}
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">玩家秀</h2>
        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享你的看法..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            ></textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">发表评论</button>
          </form>
        )}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="border-b pb-2">
                <p className="font-semibold">{comment.user?.nickname || comment.user?.username || '匿名用户'}</p>
                <p className="text-gray-700 my-1">{comment.content}</p>
                <p className="text-xs text-gray-400">{new Date(comment.createTime).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">还没有评论，快来抢沙发吧！</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlindBoxDetail;
