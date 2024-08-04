const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

// 정적 파일 서빙
app.use(express.static(__dirname));

// 기본 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
