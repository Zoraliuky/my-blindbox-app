import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlindBoxCard from '../components/BlindBoxCard'; // 导入新版卡片

// 从 @mui/material 导入布局和表单组件
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';

function BlindBoxList() {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const filteredBoxes = boxes.filter(box =>
    box.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          盲盒商店
        </Typography>
        <TextField
          label="搜索盲盒..."
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ width: '100%', maxWidth: '400px' }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        // 使用 Grid 容器来实现响应式网格布局
        <Grid container spacing={4}>
          {filteredBoxes.length > 0 ? (
            filteredBoxes.map((box) => (
              // Grid item 定义了每个卡片在不同屏幕尺寸下占的宽度
              <Grid item key={box.id} xs={12} sm={6} md={4} lg={3}>
                <BlindBoxCard box={box} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" sx={{ mt: 4 }}>没有找到符合条件的盲盒哦~</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default BlindBoxList;
