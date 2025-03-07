import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase the limit for large base64 images

// 创建 MySQL 连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'photo'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// 获取照片数据的 API 端点
app.get('/api/photos', (req, res) => {
  connection.query('SELECT id, filename, data FROM photos', (err, results) => {
    if (err) {
      console.error('Error fetching photos:', err);
      res.status(500).send('Error fetching photos');
      return;
    }
    // 将二进制数据转换为 base64
    const photos = results.map(photo => ({
      ...photo,
      data: photo.data.toString('base64')
    }));
    res.json(photos);
  });
});

// 上传照片的 API 端点
app.post('/api/photos', (req, res) => {
  const { filename, data } = req.body;
  console.log('Received upload request:', { filename, data: data.slice(0, 30) + '...' }); // 添加调试信息
  const query = 'INSERT INTO photos (filename, data) VALUES (?, ?)';
  connection.query(query, [filename, Buffer.from(data, 'base64')], (err, results) => {
    if (err) {
      console.error('Error uploading photo:', err);
      res.status(500).send('Error uploading photo');
      return;
    }
    res.status(201).json({ id: results.insertId, filename, data });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});