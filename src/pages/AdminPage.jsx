import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function AdminPage() {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取所有盲盒数据的函数
  const fetchBoxes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:7001/api/blind-box');
      setBoxes(response.data);
    } catch (error) {
      console.error("获取盲盒列表失败", error);
      alert('加载盲盒数据失败！');
    } finally {
      setLoading(false);
    }
  };

  // 在组件加载时自动获取一次数据
  useEffect(() => {
    fetchBoxes();
  }, []);

  // 处理删除操作的函数
  const handleDelete = async (id) => {
    // 在执行危险操作前，给用户一个确认的机会
    if (window.confirm('您确定要永久删除这个盲盒吗？')) {
      try {
        await axios.delete(`http://127.0.0.1:7001/api/blind-box/${id}`);
        fetchBoxes(); // 删除成功后，重新获取数据以刷新列表
      } catch (error) {
        console.error("删除失败", error);
        alert('删除失败！请检查网络或联系管理员。');
      }
    }
  };

  // TODO: 后续可以实现新增和编辑的弹窗表单
  const handleAdd = () => {
    alert('新增功能待实现');
  };
  const handleEdit = (id) => {
    alert(`编辑功能待实现 (ID: ${id})`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          盲盒管理后台
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          新增盲盒
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>名称</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>价格</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              boxes.map((box) => (
                <TableRow key={box.id}>
                  <TableCell>{box.id}</TableCell>
                  <TableCell>{box.name}</TableCell>
                  <TableCell>¥{parseFloat(box.price).toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(box.id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(box.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminPage;
