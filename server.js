const express = require('express');
const fs = require('fs');
const path = require('path');
const { AVATAR_URLS, altShot, createSeedState } = require('./data/seed');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');

function ensureDirs() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readDb() {
  ensureDirs();
  if (!fs.existsSync(DB_PATH)) {
    const seed = createSeedState();
    writeDb(seed);
    return seed;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (err) {
    console.warn('Failed to parse db.json, resetting to seed:', err.message);
    const seed = createSeedState();
    writeDb(seed);
    return seed;
  }
}

function writeDb(state) {
  ensureDirs();
  const tmpPath = `${DB_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2), 'utf8');
  fs.renameSync(tmpPath, DB_PATH);
}

function findItem(list, key) {
  if (!Array.isArray(list)) return null;
  const byId = list.find((item) => item && item.id === key);
  if (byId) return byId;
  const idx = Number(key);
  return Number.isInteger(idx) && idx >= 0 && idx < list.length ? list[idx] : null;
}

function saveUploadedDataUrl(id, dataUrl) {
  if (typeof dataUrl !== 'string') return '';
  const match = dataUrl.match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,(.+)$/i);
  if (!match) return dataUrl;
  const ext = match[1].toLowerCase() === 'jpeg' ? 'jpg' : match[1].toLowerCase();
  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || `photo_${Date.now()}`;
  const filename = `${safeId}.${ext}`;
  const filePath = path.join(UPLOADS_DIR, filename);
  fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));
  return `/uploads/${filename}`;
}

app.use(express.json({ limit: '20mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mode: 'node', port: PORT });
});

app.get('/api/state', (req, res) => {
  res.json(readDb());
});

app.post('/api/reset', (req, res) => {
  const seed = createSeedState();
  writeDb(seed);
  res.json({ ok: true, state: seed });
});

app.post('/api/photos/upload', (req, res) => {
  const body = req.body || {};
  const db = readDb();
  const id = body.id || `device_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const photoUrl = saveUploadedDataUrl(id, body.dataUrl || body.photo || '');
  if (!photoUrl) {
    return res.status(400).json({ error: 'Invalid photo payload' });
  }

  const aiScore = Number(body.aiScore) || 95;
  const altScore = Number(body.altScore) || 88;
  const item = {
    id,
    name: String(body.name || '기기 사진').slice(0, 24),
    day: Number(body.day) || 2,
    companions: Array.isArray(body.companions) ? body.companions : ['@seong_won'],
    time: String(body.time || '12.21 12:00'),
    lat: Number(body.lat) || 50.0875,
    lng: Number(body.lng) || 14.415,
    song: String(body.song || 'JVKE - Golden Hour'),
    photo: photoUrl,
    aiScore,
    altScore,
    hud: Array.isArray(body.hud)
      ? body.hud
      : [
          { color: aiScore, contrast: Math.max(80, aiScore - 2), exposure: Math.min(99, aiScore + 1) },
          { color: altScore, contrast: Math.max(80, altScore - 2), exposure: Math.min(99, altScore + 1) }
        ],
    selected: true,
    added: false
  };

  db.albumPhotos.unshift(item);
  writeDb(db);
  res.status(201).json({ ok: true, item });
});

app.patch('/api/album/:id/select', (req, res) => {
  const db = readDb();
  const item = findItem(db.albumPhotos, req.params.id);
  if (!item) return res.status(404).json({ error: 'Album photo not found' });
  if (typeof req.body?.selected === 'boolean') {
    item.selected = req.body.selected;
  } else {
    item.selected = !item.selected;
  }
  writeDb(db);
  res.json({ ok: true, item });
});

app.post('/api/places/from-album', (req, res) => {
  const ids = Array.isArray(req.body?.ids) ? req.body.ids : [];
  const db = readDb();
  const picks = db.albumPhotos.filter((p) => !p.added && (ids.length ? ids.includes(p.id) : p.selected));
  if (!picks.length) {
    return res.status(400).json({ error: 'No selected album photos' });
  }

  const addedPlaces = [];
  for (const p of picks) {
    const place = {
      id: p.id,
      name: p.name,
      day: p.day,
      companions: Array.isArray(p.companions) ? [...p.companions] : ['@seong_won'],
      authorAvatar: AVATAR_URLS.seong_won,
      lat: p.lat,
      lng: p.lng,
      time: p.time,
      song: p.song,
      photo: p.photo,
      photos: [p.photo, altShot(p.photo, 'alt2')],
      scores: [p.aiScore, p.altScore],
      hud: p.hud || [
        { color: p.aiScore, contrast: Math.max(80, p.aiScore - 2), exposure: Math.min(99, p.aiScore + 1) },
        { color: p.altScore, contrast: Math.max(80, p.altScore - 2), exposure: Math.min(99, p.altScore + 1) }
      ],
      hudOpen: false,
      photoIdx: 0,
      comment: '',
      chips: ['경치가 탁 트여 있음', '사진 찍기 좋은 스팟', '다음에 또 오고 싶음'],
      likes: 0,
      liked: false,
      comments: []
    };
    db.places.push(place);
    p.added = true;
    p.selected = false;
    addedPlaces.push(place);
  }

  writeDb(db);
  res.json({ ok: true, addedPlaces, places: db.places, albumPhotos: db.albumPhotos });
});

app.post('/api/places/:key/like', (req, res) => {
  const db = readDb();
  const place = findItem(db.places, req.params.key);
  if (!place) return res.status(404).json({ error: 'Place not found' });

  const nextLiked = typeof req.body?.liked === 'boolean' ? req.body.liked : !place.liked;
  if (nextLiked !== place.liked) {
    place.liked = nextLiked;
    place.likes = Math.max(0, place.likes + (place.liked ? 1 : -1));
    writeDb(db);
  }
  res.json({ ok: true, place });
});

app.post('/api/places/:key/memo', (req, res) => {
  const db = readDb();
  const place = findItem(db.places, req.params.key);
  if (!place) return res.status(404).json({ error: 'Place not found' });
  place.comment = String(req.body?.comment || '').slice(0, 200);
  writeDb(db);
  res.json({ ok: true, place });
});

app.post('/api/places/:key/companions', (req, res) => {
  const db = readDb();
  const place = findItem(db.places, req.params.key);
  if (!place) return res.status(404).json({ error: 'Place not found' });
  const handle = String(req.body?.handle || '@seong_hee').trim();
  if (handle && !place.companions.includes(handle)) {
    place.companions.push(handle);
    writeDb(db);
  }
  res.json({ ok: true, place });
});

app.post('/api/places/:key/comments', (req, res) => {
  const db = readDb();
  const place = findItem(db.places, req.params.key);
  if (!place) return res.status(404).json({ error: 'Place not found' });
  const text = String(req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Comment text is required' });

  const comment = {
    user: String(req.body?.user || '김성원'),
    avatar: String(req.body?.avatar || AVATAR_URLS.seong_won),
    text: text.slice(0, 300)
  };
  place.comments.push(comment);
  writeDb(db);
  res.status(201).json({ ok: true, comment, comments: place.comments });
});

app.post('/api/feed/:key/like', (req, res) => {
  const db = readDb();
  const post = findItem(db.friendsFeed, req.params.key);
  if (!post) return res.status(404).json({ error: 'Feed post not found' });

  const nextLiked = typeof req.body?.liked === 'boolean' ? req.body.liked : !post.liked;
  if (nextLiked !== post.liked) {
    post.liked = nextLiked;
    post.likes = Math.max(0, post.likes + (post.liked ? 1 : -1));
    writeDb(db);
  }
  res.json({ ok: true, post });
});

app.post('/api/feed/:key/comments', (req, res) => {
  const db = readDb();
  const post = findItem(db.friendsFeed, req.params.key);
  if (!post) return res.status(404).json({ error: 'Feed post not found' });
  const text = String(req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Comment text is required' });

  const comment = {
    user: String(req.body?.user || '김성원'),
    avatar: String(req.body?.avatar || AVATAR_URLS.seong_won),
    text: text.slice(0, 300)
  };
  post.comments.push(comment);
  writeDb(db);
  res.status(201).json({ ok: true, comment, comments: post.comments });
});

app.post('/api/friends/follow', (req, res) => {
  const db = readDb();
  const { userIdx, handle, following } = req.body || {};
  let user = null;
  if (handle) {
    user = db.companionUsers.find((u) => u.handle === handle);
  }
  if (!user && Number.isInteger(userIdx) && db.companionUsers[userIdx]) {
    user = db.companionUsers[userIdx];
  }
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.following = typeof following === 'boolean' ? following : !user.following;
  writeDb(db);
  res.json({ ok: true, user });
});

app.post('/api/friends', (req, res) => {
  const db = readDb();
  const raw = String(req.body?.raw || req.body?.handle || '').trim();
  if (!raw) return res.status(400).json({ error: 'Handle is required' });
  const handle = raw.startsWith('@') ? raw : `@${raw}`;
  const name = raw.replace(/^@/, '');

  const existing = db.companionUsers.find((u) => u.handle === handle);
  if (existing) {
    existing.following = true;
    writeDb(db);
    return res.json({ ok: true, user: existing });
  }

  const user = {
    name,
    handle,
    sub: `${handle} · 새로 추가한 친구`,
    avatar: AVATAR_URLS.san_ha,
    following: true,
    isCompanion: true
  };
  db.companionUsers.push(user);
  writeDb(db);
  res.status(201).json({ ok: true, user });
});

app.post('/api/dm/:threadId/read', (req, res) => {
  const db = readDb();
  const thread = db.dmThreads.find((t) => t.id === req.params.threadId);
  if (!thread) return res.status(404).json({ error: 'Thread not found' });
  thread.unread = false;
  writeDb(db);
  res.json({ ok: true, thread });
});

app.post('/api/dm/:threadId/messages', (req, res) => {
  const db = readDb();
  const thread = db.dmThreads.find((t) => t.id === req.params.threadId);
  if (!thread) return res.status(404).json({ error: 'Thread not found' });
  const text = String(req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Message text is required' });

  const message = { from: 'me', text: text.slice(0, 500) };
  thread.messages.push(message);
  thread.time = '방금 전';
  writeDb(db);
  res.status(201).json({ ok: true, message, thread });
});

if (require.main === module) {
  ensureDirs();
  readDb();
  app.listen(PORT, () => {
    console.log(`YEOUL server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, readDb, writeDb };
