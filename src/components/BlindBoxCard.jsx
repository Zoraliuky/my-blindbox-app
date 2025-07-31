import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// 从 @mui/material 导入卡片相关组件
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';

function BlindBoxCard({ box }) {
  if (!box) {
    return null; // 如果没有数据，不渲染任何东西
  }

  return (
    // 使用 Card 组件作为根元素，它自带了阴影和圆角
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* CardActionArea 使得整个卡片区域都可以点击 */}
      <CardActionArea
        component={RouterLink}
        to={`/box/${box.id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        {/* CardMedia 用于显示图片 */}
        <CardMedia
          component="img"
          height="140"
          image={box.imageUrl || `https://placehold.co/400x300/e0e0e0/333?text=盲盒图片`}
          alt={box.name}
          sx={{
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        {/* CardContent 用于包裹卡片的文本内容 */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {box.name || '未命名盲盒'}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              ¥{parseFloat(box.price).toFixed(2) || '0.00'}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BlindBoxCard;
