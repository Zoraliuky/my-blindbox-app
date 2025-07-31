import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// 从 @mui/material 导入各种组件
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // 导入返回图标

function BlindBoxDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [box, setBox] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [boxRes, commentsRes] = await Promise.all([
        axios.get(`http://127.0.0.1:7001/api/blind-box/${id}`),
        axios.get(`http://127.0.0.1:7001/api/comment?blindBoxId=${id}`),
      ]);
      setBox(boxRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      setError('加载数据失败。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
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
      setNewComment('');
      fetchData();
    } catch (error) {
      alert('评论失败，请稍后再试。');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !box) {
    return <Typography color="error" align="center" sx={{ mt: 4 }}>{error || '找不到该盲盒。'}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        返回列表
      </Button>
      <Paper elevation={3}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={box.imageUrl || `https://placehold.co/600x600/e0e0e0/333?text=${box.name}`}
              alt={box.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {box.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {box.description}
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ¥{parseFloat(box.price).toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleDraw}
                sx={{ mt: 2 }}
              >
                立即抽取
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* 评论区 */}
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          玩家秀
        </Typography>
        {isAuthenticated && (
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 2 }}>
            <TextField
              label="分享你的看法..."
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ mt: 1 }}>
              发表评论
            </Button>
          </Box>
        )}
        <List>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{comment.user?.nickname?.[0] || comment.user?.username?.[0] || '匿'}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user?.nickname || comment.user?.username || '匿名用户'}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {comment.content}
                        </Typography>
                        <br />
                        {new Date(comment.createTime).toLocaleString()}
                      </>
                    }
                  />
                </ListItem>
                {index < comments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Typography color="text.secondary">还没有评论，快来抢沙发吧！</Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default BlindBoxDetail;
