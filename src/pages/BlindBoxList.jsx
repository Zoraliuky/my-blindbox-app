import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 导入 axios 用于网络请求
import BlindBoxCard from '../components/BlindBoxCard'; // 导入刚刚创建的卡片组件

function BlindBoxList() {
  // 使用 useState 创建一个状态变量 `boxes`，用来存储从后端获取的盲盒数组。
  // `boxes` 是当前的数据。
  // `setBoxes` 是一个函数，用来更新 `boxes` 的值。
  //  初始值设为一个空数组 `[]`。
  const [boxes, setBoxes] = useState([]);

  // 使用 useState 创建一个状态变量 `loading`，用来跟踪数据是否正在加载中。
  const [loading, setLoading] = useState(true);

  // 使用 useState 创建一个状态变量 `error`，用来存储加载数据时可能发生的错误信息。
  const [error, setError] = useState(null);

  // 使用 useEffect 来处理“副作用”，比如网络请求。
  // 这个 Hook 里的代码会在组件第一次渲染到屏幕上之后自动执行一次。
  // 第二个参数 `[]` 是一个依赖项数组，空数组表示这个 effect 只执行一次。
  useEffect(() => {
    // 定义一个异步函数来获取数据
    const fetchBoxes = async () => {
      try {
        // 使用 axios 发起 GET 请求到我们的后端 API。
        const response = await axios.get('http://127.0.0.1:7001/api/blind-box');
        
        //请求成功后，使用 setBoxes 函数更新状态，将获取到的数据存起来。
        setBoxes(response.data);
      } catch (err) {
        //如果请求过程中发生错误，就更新 error 状态。
        setError('加载盲盒数据失败，请稍后再试。');
        console.error(err);
      } finally {
        //最后将 loading 状态设置为 false。
        setLoading(false);
      }
    };

    fetchBoxes(); // 调用这个函数来开始获取数据
  }, []); // 空依赖数组，确保只在组件挂载时执行一次

  //根据不同的状态，显示不同的 UI

  // 如果正在加载中，显示一个加载提示
  if (loading) {
    return <div className="text-center p-10">正在努力加载中...</div>;
  }

  // 如果发生了错误，显示错误信息
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  //数据加载成功，渲染主界面
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          盲盒商店
        </h1>

        {/*使用网格布局来展示盲盒卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/*用 .map() 方法遍历 boxes 数组，为每一项数据渲染一个 BlindBoxCard 组件 */}
          {boxes.map((box) => (
            //key={box.id}  React 用它来高效地更新列表。
            //box={box}通过 props 将单个盲盒的数据传递给卡片组件。
            <BlindBoxCard key={box.id} box={box} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlindBoxList;
