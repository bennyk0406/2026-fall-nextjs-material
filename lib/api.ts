import axios from 'axios';

// 공용 설정을 한 곳에: Base URL, 헤더, (필요하면) 인증 정보
export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});
