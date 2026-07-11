// 캐싱 없이 "설치 가능한 앱" 인식 + 푸시 알림 수신 역할을 합니다.
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

// 서버(Edge Function)에서 보낸 푸시를 받아 실제 알림으로 표시
self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) { data = { title: '찬스수학', body: e.data ? e.data.text() : '' }; }

  const title = data.title || '찬스수학';
  const options = {
    body: data.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: data.url || './' },
    tag: data.tag || undefined
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// 알림을 눌렀을 때 앱을 열거나, 이미 열려 있으면 그 창으로 포커스 이동
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const targetUrl = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      for (const client of clientsArr) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
