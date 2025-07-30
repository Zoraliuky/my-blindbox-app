import React from 'react';
// 从 react-router-dom 中导入 Link 组件，它用来实现页面跳转。
import { Link } from 'react-router-dom';

/**
 * 盲盒卡片组件
 * 这是一个“展示型”组件，它只负责根据传入的数据来显示UI。
 * @param {object} props - 组件的属性对象，我们期望里面有一个名为 box 的对象。
 */
function BlindBoxCard({ box }) {
  // 如果因为某些原因没有接收到 box 数据，就显示一个加载提示，防止程序崩溃。
  if (!box) {
    return <div>加载中...</div>;
  }

  // 2. 使用 Link 组件把整个卡片包裹起来。
  //    - to={`/box/${box.id}`} 指定了点击这个卡片后要跳转的地址。
  //    - 例如，如果 box.id 是 5，点击后就会跳转到 /box/5。
  return (
    <Link to={`/box/${box.id}`} className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        {/* 3. 显示盲盒图片 */}
        <img
          src={box.imageUrl || `https://placehold.co/400x300/e2e8f0/334155?text=盲盒图片`}
          alt={box.name}
          // 使用 onerror 来处理图片加载失败的情况，显示一个占位图。
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/e2e8f0/334155?text=图片加载失败`; }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        {/* 4. 显示盲盒名称 */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {box.name || '未命名盲盒'}
        </h3>

        {/* 5. 显示盲盒价格 */}
        <p className="mt-2 text-xl font-bold text-indigo-600">
          ¥{parseFloat(box.price).toFixed(2) || '0.00'}
        </p>
      </div>
    </Link>
  );
}

export default BlindBoxCard;
