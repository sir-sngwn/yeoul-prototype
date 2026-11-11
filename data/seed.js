const LENNON_WIKI_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Lennon_Wall_in_Prague_%282018%29.jpg/800px-Lennon_Wall_in_Prague_%282018%29.jpg';
const LENNON_FALLBACK_URL =
  'https://images.unsplash.com/photo-1708569873142-1727fb9d82cf?auto=format&fit=crop&w=800&q=80';

const PHOTO_URLS = {
  oldtown: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=80',
  charles: 'https://images.unsplash.com/photo-1562624475-96c2bc08fab9?auto=format&fit=crop&w=800&q=80',
  castle: 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&w=800&q=80',
  vysehrad: 'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?auto=format&fit=crop&w=800&q=80',
  dancing: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=80',
  lennon: LENNON_WIKI_URL,
  powder: 'https://images.unsplash.com/photo-1564511287568-54483b52a35e?auto=format&fit=crop&w=800&q=80',
  letna: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
};

const AVATAR_URLS = {
  hyun_seo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
  min_kyung: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&h=160&q=80',
  seong_won: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
  seong_hee: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
  san_ha: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80'
};

function altShot(url, variant) {
  if (!url || url.startsWith('data:') || url.startsWith('/uploads/')) return url;
  const base = url.split('?')[0];
  const crops = { alt1: 'crop=left&h=620', alt2: 'crop=bottom&h=640' };
  return `${base}?auto=format&fit=crop&w=800&${crops[variant] || crops.alt1}&q=72`;
}

function createSeedState() {
  return {
    companionUsers: [
      {
        name: '최현서',
        handle: '@hyun_seo',
        sub: '프라하 동행 · 사진 6장',
        avatar: AVATAR_URLS.hyun_seo,
        following: true,
        isCompanion: true
      },
      {
        name: '송민경',
        handle: '@min_kyung',
        sub: '프라하 동행 · 사진 7장',
        avatar: AVATAR_URLS.min_kyung,
        following: true,
        isCompanion: true
      },
      {
        name: '박성희',
        handle: '@seong_hee',
        sub: '함께 아는 친구 5명',
        avatar: AVATAR_URLS.seong_hee,
        following: false,
        isCompanion: false
      },
      {
        name: '이산하',
        handle: '@san_ha',
        sub: '최현서 님이 팔로우함',
        avatar: AVATAR_URLS.san_ha,
        following: false,
        isCompanion: false
      },
      {
        name: '강도윤',
        handle: '@doyun_k',
        sub: '회원님을 위한 추천',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&h=160&q=80',
        following: false,
        isCompanion: false
      },
      {
        name: '정유진',
        handle: '@yujin_travel',
        sub: '체코 프라하 여행 중',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
        following: false,
        isCompanion: false
      }
    ],
    activityFeed: [
      {
        id: 'act1',
        user: '최현서',
        avatar: AVATAR_URLS.hyun_seo,
        targetDesc: "'프라하 성' 사진에 댓글",
        actionTail: '을 남겼습니다.',
        time: '방금 전',
        btnText: '보기',
        type: 'comment',
        placeIdx: 0
      },
      {
        id: 'act2',
        user: '송민경',
        avatar: AVATAR_URLS.min_kyung,
        targetDesc: '새로운 체코 여행 앨범',
        actionTail: '을 공유했습니다.',
        time: '12분 전',
        btnText: '보기',
        type: 'album'
      },
      {
        id: 'act3',
        user: '박성희',
        avatar: AVATAR_URLS.seong_hee,
        targetDesc: '회원님을 팔로우',
        actionTail: '하기 시작했습니다.',
        time: '1시간 전',
        btnText: '맞팔로우',
        type: 'follow',
        userIdx: 2
      },
      {
        id: 'act4',
        user: '이산하',
        avatar: AVATAR_URLS.san_ha,
        targetDesc: "'카를교' 사진",
        actionTail: '을 좋아합니다.',
        time: '3시간 전',
        btnText: '보기',
        type: 'like',
        placeIdx: 1
      }
    ],
    dmThreads: [
      {
        id: 'hyun_seo',
        name: '최현서',
        avatar: AVATAR_URLS.hyun_seo,
        time: '오후 8:32',
        unread: true,
        messages: [
          { from: 'them', text: '프라하 성 야경 사진 정리 끝났어?' },
          { from: 'me', text: '응 방금 여울 지도에 다 올려뒀어!' },
          { from: 'them', text: '우리 다음엔 어디 가?' }
        ]
      },
      {
        id: 'min_kyung',
        name: '송민경',
        avatar: AVATAR_URLS.min_kyung,
        time: '방금 전',
        unread: false,
        messages: [
          { from: 'me', text: '카를교 아침 사진 색감 진짜 좋더라' },
          { from: 'them', text: '프라하 사진 다 올렸어! 공유해줘' }
        ]
      }
    ],
    places: [
      {
        id: 'castle',
        name: '프라하 성',
        day: 2,
        companions: ['@hyun_seo', '@seong_won'],
        authorAvatar: AVATAR_URLS.hyun_seo,
        lat: 50.0895,
        lng: 14.4048,
        time: '12.21 16:48',
        song: 'JVKE - Golden Hour',
        photo: PHOTO_URLS.castle,
        photos: [PHOTO_URLS.castle, altShot(PHOTO_URLS.castle, 'alt1')],
        scores: [98, 89],
        hud: [
          { color: 99, contrast: 96, exposure: 98 },
          { color: 89, contrast: 88, exposure: 90 }
        ],
        hudOpen: false,
        photoIdx: 0,
        comment: '올라가는 길은 좀 힘들었는데 위에서 본 뷰가 최고',
        chips: ['올라가는 길은 좀 힘들었는데 위에서 본 뷰가 최고', '해 질 녘에 가니까 풍경이 잘 보임', '생각보다 규모가 커서 볼 게 많았음'],
        likes: 24,
        liked: false,
        comments: [
          { user: '김성원', avatar: AVATAR_URLS.seong_won, text: '성 위에서 내려다본 주황색 지붕들 아직도 생각남' },
          { user: '최현서', avatar: AVATAR_URLS.hyun_seo, text: '여기 야경 보면서 마신 맥주 진짜 최고였음' }
        ]
      },
      {
        id: 'charles',
        name: '카를교',
        day: 2,
        companions: ['@hyun_seo'],
        authorAvatar: AVATAR_URLS.hyun_seo,
        lat: 50.0865,
        lng: 14.4114,
        time: '12.21 08:10',
        song: 'Ludovico Einaudi - Nuvole Bianche',
        photo: PHOTO_URLS.charles,
        photos: [PHOTO_URLS.charles, altShot(PHOTO_URLS.charles, 'alt1')],
        scores: [96, 87],
        hud: [
          { color: 98, contrast: 95, exposure: 96 },
          { color: 87, contrast: 86, exposure: 88 }
        ],
        hudOpen: false,
        photoIdx: 0,
        comment: '아침 일찍 가니까 한산해서 사진 찍기 딱 좋음',
        chips: ['아침 일찍 가니까 한산해서 사진 찍기 딱 좋음', '다리 위에서 보는 강변 뷰가 좋음', '산책하면서 건너기 적당했음'],
        likes: 19,
        liked: true,
        comments: [
          { user: '박성희', avatar: AVATAR_URLS.seong_hee, text: '안개 살짝 낀 색감 대박이다' },
          { user: '최현서', avatar: AVATAR_URLS.hyun_seo, text: '일찍 일어나서 나가길 진짜 잘했어' }
        ]
      },
      {
        id: 'oldtown',
        name: '구시가지 광장',
        day: 1,
        companions: ['@hyun_seo', '@seong_won'],
        authorAvatar: AVATAR_URLS.seong_won,
        lat: 50.0882,
        lng: 14.4182,
        time: '12.20 18:14',
        song: 'Lauv - Paris in the Rain',
        photo: PHOTO_URLS.oldtown,
        photos: [PHOTO_URLS.oldtown, altShot(PHOTO_URLS.oldtown, 'alt1')],
        scores: [94, 88],
        hud: [
          { color: 96, contrast: 93, exposure: 94 },
          { color: 89, contrast: 87, exposure: 88 }
        ],
        hudOpen: false,
        photoIdx: 0,
        comment: '사람 많았는데 야경은 진짜 좋았음',
        chips: ['사람 많았는데 야경은 진짜 좋았음', '시계탑 앞이 사진 찍기 좋았음', '근처 노점 음식이 괜찮았음'],
        likes: 31,
        liked: false,
        comments: [
          { user: '최현서', avatar: AVATAR_URLS.hyun_seo, text: '천문시계 정각 종소리 기다리던 거 재밌었음' },
          { user: '김성원', avatar: AVATAR_URLS.seong_won, text: '광장 앞 굴라쉬 맛집 또 가고 싶다' }
        ]
      },
      {
        id: 'vysehrad',
        name: '비셰흐라드',
        day: 1,
        companions: ['@seong_won'],
        authorAvatar: AVATAR_URLS.seong_won,
        lat: 50.0842,
        lng: 14.4152,
        time: '12.20 19:32',
        song: 'Claude Debussy - Clair de Lune',
        photo: PHOTO_URLS.vysehrad,
        photos: [PHOTO_URLS.vysehrad, altShot(PHOTO_URLS.vysehrad, 'alt1')],
        scores: [92, 84],
        hud: [
          { color: 95, contrast: 91, exposure: 92 },
          { color: 85, contrast: 83, exposure: 84 }
        ],
        hudOpen: false,
        photoIdx: 0,
        comment: '',
        chips: [
          '야경 보면서 맥주 마시기 좋았음',
          '조용해서 산책하기 괜찮았음',
          '바람은 좀 불었지만 뷰가 탁 트여 있음'
        ],
        likes: 15,
        liked: false,
        comments: [
          { user: '이산하', avatar: AVATAR_URLS.san_ha, text: '여기 노을 맛집이라고 들었는데 부럽다' },
          { user: '김성원', avatar: AVATAR_URLS.seong_won, text: '성벽 위 산책로가 생각보다 훨씬 한적했음' }
        ]
      }
    ],
    albumPhotos: [
      {
        id: 'dancing',
        name: '댄싱 하우스',
        day: 2,
        companions: ['@hyun_seo'],
        time: '12.21 11:20',
        lat: 50.0755,
        lng: 14.4141,
        song: 'Chet Baker - Almost Blue',
        photo: PHOTO_URLS.dancing,
        aiScore: 98,
        altScore: 90,
        hud: [
          { color: 99, contrast: 97, exposure: 98 },
          { color: 89, contrast: 90, exposure: 91 }
        ],
        selected: true,
        added: false
      },
      {
        id: 'lennon',
        name: '존 레논 벽',
        day: 2,
        companions: ['@hyun_seo', '@seong_won'],
        time: '12.21 13:05',
        lat: 50.0862,
        lng: 14.4068,
        song: 'The Beatles - Imagine',
        photo: LENNON_FALLBACK_URL,
        aiScore: 94,
        altScore: 86,
        hud: [
          { color: 96, contrast: 93, exposure: 94 },
          { color: 85, contrast: 86, exposure: 87 }
        ],
        selected: false,
        added: false
      },
      {
        id: 'powder',
        name: '화약탑',
        day: 1,
        companions: ['@seong_won'],
        time: '12.20 15:40',
        lat: 50.0873,
        lng: 14.4278,
        song: 'Olafur Arnalds - Saman',
        photo: PHOTO_URLS.powder,
        aiScore: 91,
        altScore: 83,
        hud: [
          { color: 92, contrast: 91, exposure: 91 },
          { color: 82, contrast: 83, exposure: 84 }
        ],
        selected: false,
        added: false
      },
      {
        id: 'letna',
        name: '레트나 공원',
        day: 2,
        companions: ['@hyun_seo', '@seong_won'],
        time: '12.21 17:40',
        lat: 50.0948,
        lng: 14.4158,
        song: 'Novo Amor - Anchor',
        photo: PHOTO_URLS.letna,
        aiScore: 95,
        altScore: 88,
        hud: [
          { color: 97, contrast: 94, exposure: 95 },
          { color: 87, contrast: 88, exposure: 89 }
        ],
        selected: false,
        added: false
      }
    ],
    friendsFeed: [
      {
        id: 'feed_1',
        author: '최현서',
        handle: '@hyun_seo',
        avatar: AVATAR_URLS.hyun_seo,
        city: 'prague',
        location: '체코 프라하 · 댄싱 하우스',
        time: '34분 전',
        photo: PHOTO_URLS.dancing,
        desc: '블타바 강변 따라 걷다가 만난 댄싱 하우스. 노을빛이 강물에 반사되는 순간이 최고였음 🌆',
        tag: '@hyun_seo · @seong_won',
        likes: 38,
        liked: false,
        comments: [
          { user: '김성원', avatar: AVATAR_URLS.seong_won, text: '이 노을 색감 뭐야 진짜 필름 같다' },
          { user: '송민경', avatar: AVATAR_URLS.min_kyung, text: '댄싱 하우스 옥상 바도 갔어?' },
          { user: '최현서', avatar: AVATAR_URLS.hyun_seo, text: '응 거기서 이 사진 찍었어 ㅎㅎ' }
        ],
        isCompanion: true
      },
      {
        id: 'feed_2',
        author: '송민경',
        handle: '@min_kyung',
        avatar: AVATAR_URLS.min_kyung,
        city: 'prague',
        location: '체코 프라하 · 레트나 공원',
        time: '2시간 전',
        photo: PHOTO_URLS.letna,
        desc: '프라하 시내와 다리들이 한눈에 다 보이는 뷰포인트. 여기서 마신 맥주 맛 잊지 못해 🍺',
        tag: '@min_kyung',
        likes: 54,
        liked: true,
        comments: [
          { user: '최현서', avatar: AVATAR_URLS.hyun_seo, text: '레트나 비어가든 또 가고 싶다' },
          { user: '이산하', avatar: AVATAR_URLS.san_ha, text: '다리 겹쳐 보이는 구도 미쳤다' }
        ],
        isCompanion: true
      },
      {
        id: 'feed_3',
        author: '강도윤',
        handle: '@doyun_k',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&h=160&q=80',
        city: 'tokyo',
        location: '일본 도쿄 · 시부야 스카이',
        time: '5시간 전',
        photo: PHOTO_URLS.tokyo,
        desc: '도쿄의 화려한 야경. 날씨가 맑아서 후지산 실루엣까지 멀리 선명하게 보였던 날 🗼',
        tag: '@doyun_k',
        likes: 82,
        liked: false,
        comments: [
          { user: '정유진', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80', text: '후지산까지 보이는 날 드문데 운 좋았다!' },
          { user: '김성원', avatar: AVATAR_URLS.seong_won, text: '시부야 스카이 예약 어떻게 했어?' }
        ],
        isCompanion: false
      },
      {
        id: 'feed_4',
        author: '정유진',
        handle: '@yujin_travel',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
        city: 'prague',
        location: '체코 프라하 · 존 레논 벽',
        time: '어제',
        photo: LENNON_FALLBACK_URL,
        desc: '각국의 여행자들이 남긴 평화의 메시지들. 자유로운 색채가 골목 가득 채워져 있음 🎨',
        tag: '@yujin_travel',
        likes: 47,
        liked: false,
        comments: [
          { user: '박성희', avatar: AVATAR_URLS.seong_hee, text: '여기 메시지 남기고 왔어?' }
        ],
        isCompanion: false
      }
    ]
  };
}

module.exports = { AVATAR_URLS, altShot, createSeedState };
