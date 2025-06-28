interface Capsules {
    id: string;
    title: string;
    description: string;
    heart: number;
    refferer: number;
    thumbnail: string;
    category: string;
    tags: string[];
  }

export const capsules: Capsules[] = [
  {
    id: '1',
    title: '서든어택 가이드',
    description: '초보자들을 위한 서든어택 가이드',
    heart: 100,
    refferer: 900,
    thumbnail: require('../images/mockThumbNail/thumb_games.png'),
    category: 'games',
    tags: ['games', 'beginner', 'suddenattack guide']
  },
  {
    id: '2',
    title: '아이언맨2',
    description: '아이언맨2 영화 리뷰',
    heart: 100,
    refferer: 80,
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'movies', // 'movie' -> 'movies'로 수정 (category 객체에 맞춤)
    tags: ['movies', '아이언맨', '영화']
  },
  {
    id: '3',
    title: '출근할 때 듣는 피아노 연주곡',
    description: '출근할 때 듣는 피아노 연주곡 플레이 리스트',
    heart: 100,
    refferer: 80,
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'musics', // 'music' -> 'musics'로 수정 (category 객체에 맞춤)
    tags: ['musics', '피아노', '플레이리스트']
  },
  // =========================================================
  // category 객체에서 추가된 데이터
  // =========================================================
  {
    id: '4',
    title: '보드게임1',
    description: '보드게임1에 대한 흥미로운 가이드입니다.',
    heart: 120,
    refferer: 95,
    thumbnail: require('../images/mockThumbNail/thumb_games.png'), // 게임 카테고리 썸네일
    category: 'games',
    tags: ['games', '보드게임', '초보']
  },
  {
    id: '5',
    title: '보드게임2',
    description: '보드게임2의 전략과 팁을 알아보세요.',
    heart: 150,
    refferer: 110,
    thumbnail: require('../images/mockThumbNail/thumb_games.png'),
    category: 'games',
    tags: ['games', '보드게임', '전략']
  },
  {
    id: '6',
    title: '보드게임3',
    description: '보드게임3의 숨겨진 재미를 발견하세요.',
    heart: 90,
    refferer: 70,
    thumbnail: require('../images/mockThumbNail/thumb_games.png'),
    category: 'games',
    tags: ['games', '보드게임', '재미']
  },
  {
    id: '7',
    title: '아이언맨',
    description: '마블 시네마틱 유니버스 아이언맨 영화에 대한 분석',
    heart: 200,
    refferer: 180,
    thumbnail: require('../images/mockThumbNail/thumb_movies.png'), // 영화 카테고리 썸네일
    category: 'movies',
    tags: ['movies', '아이언맨', '마블']
  },
  {
    id: '8',
    title: '가디언즈오브갤럭시',
    description: '가디언즈 오브 갤럭시의 유쾌한 모험 이야기',
    heart: 180,
    refferer: 160,
    thumbnail: require('../images/mockThumbNail/thumb_movies.png'),
    category: 'movies',
    tags: ['movies', '가디언즈오브갤럭시', 'SF']
  },
  {
    id: '9',
    title: '썬더볼츠*',
    description: '새로운 마블 팀, 썬더볼츠에 대한 심층 분석',
    heart: 160,
    refferer: 140,
    thumbnail: require('../images/mockThumbNail/thumb_movies.png'),
    category: 'movies',
    tags: ['movies', '썬더볼츠', '히어로']
  },
  {
    id: '10',
    title: '탑건2',
    description: '탑건: 매버릭, 최고의 항공 액션 영화 리뷰',
    heart: 190,
    refferer: 170,
    thumbnail: require('../images/mockThumbNail/thumb_movies.png'),
    category: 'movies',
    tags: ['movies', '탑건', '액션']
  },
  {
    id: '11',
    title: '야당',
    description: '흥미로운 정치 드라마 야당 시청 가이드',
    heart: 110,
    refferer: 90,
    thumbnail: require('../images/mockThumbNail/thumb_movies.png'),
    category: 'movies',
    tags: ['movies', '정치', '드라마']
  },
  {
    id: '12',
    title: '모우닝 재즈',
    description: '편안한 모우닝 재즈로 하루를 시작해보세요.',
    heart: 130,
    refferer: 100,
    thumbnail: require('../images/mockThumbNail/thumb_musics.png'), // 음악 카테고리 썸네일
    category: 'musics',
    tags: ['musics', '재즈', '힐링']
  },
  {
    id: '13',
    title: '요즘 서순라길 카페는 이런 노래 나오던데?',
    description: '서순라길 카페 분위기를 느낄 수 있는 플레이리스트',
    heart: 140,
    refferer: 115,
    thumbnail: require('../images/mockThumbNail/thumb_musics.png'),
    category: 'musics',
    tags: ['musics', '카페', '플레이리스트']
  },
  {
    id: '14',
    title: '브루노메이저 모음',
    description: '브루노 메이저의 감성적인 곡들을 한 곳에 모았습니다.',
    heart: 160,
    refferer: 130,
    thumbnail: require('../images/mockThumbNail/thumb_musics.png'),
    category: 'musics',
    tags: ['musics', '브루노메이저', '감성']
  },
  {
    id: '15',
    title: 'breeze',
    description: '잔잔한 바람처럼 편안한 음악 컬렉션 "breeze"',
    heart: 125,
    refferer: 98,
    thumbnail: require('../images/mockThumbNail/thumb_musics.png'),
    category: 'musics',
    tags: ['musics', '힐링', '편안한']
  },
  {
    id: '16',
    title: 'AI 잘쓰는법',
    description: '인공지능을 효율적으로 활용하는 방법 가이드',
    heart: 170,
    refferer: 150,
    thumbnail: require('../images/mockThumbNail/thumb_it.png'), // IT 카테고리 썸네일
    category: 'it',
    tags: ['it', 'AI', '인공지능']
  },
  {
    id: '17',
    title: 'supabase',
    description: 'Supabase를 활용한 백엔드 개발 가이드',
    heart: 155,
    refferer: 135,
    thumbnail: require('../images/mockThumbNail/thumb_it.png'),
    category: 'it',
    tags: ['it', 'supabase', '백엔드']
  },
  {
    id: '18',
    title: '자동 ui 만들기',
    description: '자동화된 UI 생성을 위한 팁과 도구',
    heart: 145,
    refferer: 125,
    thumbnail: require('../images/mockThumbNail/thumb_it.png'),
    category: 'it',
    tags: ['it', 'UI', '자동화']
  },
  {
    id: '19',
    title: '자바는 아져씨 노드는 오빠',
    description: 'Java와 Node.js의 특성을 비교 분석합니다.',
    heart: 135,
    refferer: 115,
    thumbnail: require('../images/mockThumbNail/thumb_it.png'),
    category: 'it',
    tags: ['it', 'Java', 'Node.js']
  },
  {
    id: '20',
    title: '요즘 it',
    description: '최신 IT 트렌드와 기술 동향에 대한 정보',
    heart: 165,
    refferer: 145,
    thumbnail: require('../images/mockThumbNail/thumb_it.png'),
    category: 'it',
    tags: ['it', '트렌드', '기술']
  },
];

export const capsuleCategories = [
  'all',
  'it',
  'musics',
  'games',
  'movies',
];