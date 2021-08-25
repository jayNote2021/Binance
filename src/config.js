import dotenv from 'dotenv';
import path from 'path';

// 환경변수에 따른 .env* 파일 읽어오기
dotenv.config({
  path: path.resolve(
    process.cwd(), // 프로젝트 루트 경로
    process.env.NODE_ENV == 'production' //
      ? '.env' // 서비스 환경인 경우
      : '.env.dev' // 개발 환경인 경우
  ),
});

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  // null 또는 undefined
  if (value == null) {
    throw new Error(`env key ${key} is undefined`);
  }
  return value;
}

// 환경변수를 읽어서 객체로 변환
export const config = {
  host: {
    port: required('HOST_PORT', 8080),
  },
  binance: {
    api_key: required('BINANCE_API_KEY'),
    api_secret_key: required('BINANCE_API_SECRET_KEY'),
  },
};
