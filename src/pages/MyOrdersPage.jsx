import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

// 从 @mui/material 导入组件
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // 导入一个图标

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
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
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <ShoppingCartIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          我的订单
        </Typography>
      </Box>

      {/* 使用 Paper 组件作为列表的容器，提供一个带阴影的背景 */}
      <Paper elevation={3}>
        {orders.length > 0 ? (
          <List>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                {/* ListItem 代表列表中的一个项目 */}
                <ListItem>
                  {/* ListItemAvatar 用于在列表项左侧显示头像或图片 */}
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={order.blindBox.imageUrl || `https://placehold.co/100x100/e0e0e0/333?text=图片`}
                      alt={order.blindBox.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  </ListItemAvatar>
                  {/* ListItemText 是列表项的主要文本内容 */}
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="span">
                        {order.blindBox.name}
                      </Typography>
                    }
                    secondary={`订单时间: ${new Date(order.createTime).toLocaleString()}`}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ¥{parseFloat(order.blindBox.price).toFixed(2)}
                  </Typography>
                </ListItem>
                {/* 在每个列表项之间添加一个分隔线，除了最后一项 */}
                {index < orders.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', p: 8 }}>
            <Typography variant="h6" gutterBottom>
              您还没有任何订单记录
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/"
            >
              去商店逛逛
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default MyOrdersPage;
