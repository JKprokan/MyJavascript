const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Body parser 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// View 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 회원 스키마 정의
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Member = mongoose.model('Member', memberSchema);

// 회원가입 폼 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 회원가입 처리 라우트
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const newMember = new Member({ name, email, password });
    newMember.save()
        .then(() => res.redirect('/members'))
        .catch(err => res.status(500).send('Error: ' + err));
});

// 회원 정보 표시 라우트
app.get('/members', (req, res) => {
    Member.find({}, (err, members) => {
        if (err) return res.status(500).send('Error: ' + err);
        res.render('members', { members });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
