// 지금은 캐싱 없이 "설치 가능한 앱"으로 인식되게 하는 최소 역할만 합니다.
// 데이터는 항상 Supabase에서 실시간으로 받아오기 때문에, 오프라인 캐싱은 넣지 않았습니다.
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // 그대로 네트워크로 통과 (캐싱 없음)
});
