import express from 'express';
// 공통: 헤더, 로그
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// 비동기 에러 처리 모듈
import 'express-async-errors';
// 설정
import { config } from './config.js';

// 라우터
// config

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.get('/', (req, res, next) => {
  res.sendStatus(200);
});

// 라우트

// 에러 미들웨어
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'server error' });
});

// 404 처리
app.use((req, res, next) => {
  console.log('[404 Not found] : ' + req.url);
  res.sendStatus(404);
});

app.listen(config.host.port);
