import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlindBoxCard from '../components/BlindBoxCard';

function BlindBoxList() {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. 新增一个 state，专门用来存储用户在搜索框里输入的文字。
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:7001/api/blind-box');
        setBoxes(response.data);
      } catch (err) {
        setError('加载盲盒数据失败，请稍后再试。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  // 2. 创建一个“派生状态” (Derived State)。
  //    - 它不是一个新的 state，而是根据现有的 `boxes` 和 `searchTerm` state 计算出来的新变量。
  //    - .filter() 方法会遍历原始的 boxes 数组。
  //    - box.name.toLowerCase().includes(searchTerm.toLowerCase())
  //      - 这行代码的意思是：把盲盒名称和搜索词都转成小写，然后检查名称中是否“包含”搜索词。
  //      - 这样可以实现不区分大小写的模糊搜索。
  const filteredBoxes = boxes.filter(box =>
    box.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-10">正在努力加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          盲盒商店
        </h1>

        {/* 3. 添加搜索框的 UI */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="搜索盲盒名称..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            // 4. 将输入框的值与 searchTerm state 绑定
            value={searchTerm}
            // 5. 当用户在输入框里打字时，触发 onChange 事件，调用 setSearchTerm 更新状态
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 6. 将 .map() 的遍历对象从 `boxes` 改为 `filteredBoxes` */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBoxes.map((box) => (
            <BlindBoxCard key={box.id} box={box} />
          ))}
        </div>

        {/* 7. 如果筛选后的列表是空的，显示一个提示信息 */}
        {filteredBoxes.length === 0 && (
          <div className="text-center col-span-full text-gray-500 mt-10">
            <p>没有找到符合条件的盲盒哦~</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlindBoxList;
