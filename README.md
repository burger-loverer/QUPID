
1. dependecies 설치

   ```bash
   npm install
   ```

2. 시작 명령어 > QR 코드 나오면 핸드폰으로 연동하기

   ```bash
   npx expo start
   ```

# 💘 Qupid Native (React Native Expo v1.0) - 업데이트

## 📱 개요

Qupid 앱 프로토타입 개발을 위한 기술 가이드입니다. 

Qupid 서비스는 외부 소셜 콘텐츠나 웹 링크를 사용자가 큐레이션하여 공유하고, 이 과정에서 기여도를 추적 및 보상하는 것을 목표로 합니다.

### 핵심 기능
- 캡슐(Capsule): 콘텐츠 공유 단위
- QID: 사용자 고유 식별자
- 레퍼럴 시스템: 기여도 추적 및 보상

### 작업 순서
1. Supabase 프로젝트 설정 및 스키마 정의.
2. Privy 연동 및 사용자 인증 구현 (React Native 클라이언트 + Supabase Edge Function).
3. 캡슐 생성 기능 구현 (UI + 메타데이터 추출 Edge Function + DB 저장).
4. 캡슐 피드 화면 구현 (UI + 데이터 로딩).
5. Qupid dApp 스토어 화면 구현 (UI + 데이터 로딩).
6. 마이페이지 화면 구현 (UI + 데이터 연동).
7. 레퍼럴 포인트 시스템 구현 (Edge Function 내 로직 완성).


## 🛠 기술 스택

### 클라이언트
- **프레임워크**: React Native (Expo)
  - [Expo 문서](https://docs.expo.dev/)

### 인증
- **Privy.io**
  - [React Native SDK 문서](https://docs.privy.io/basics/react-native/setup)
  - [Figma UI Kit](https://www.figma.com/design/aH1PPRwPNDaRoa8RIGqUsg/Sample-Privy-UIs--Community-?node-id=0-1&p=f&t=myQhWycQgQGxRWZ6-0)

### 백엔드
- **Supabase (BaaS)**
  - [Supabase Expo React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)

## 🔐 인증 시스템

### Privy & Supabase 연동

#### 인증 방식
- privy.io 를 활용한 소셜 로그인(암호화폐 지갑 로그인)

### Privy SDK 설치 및 구성

1. SDK 설치
```bash
npx expo install expo-apple-authentication expo-application expo-crypto expo-linking expo-secure-store expo-web-browser react-native-passkeys react-native-webview @privy-io/expo-native-extensions @privy-io/expo
```

2. `app.json` 구성
```json
{
  "expo": {
    "scheme": "qupid",
    "plugins": [
      [
        "@privy-io/expo-auth",
        {
          "privyClientId": "YOUR_PRIVY_APP_ID"
        }
      ]
    ]
  }
}
```

### 인증 구현 가이드

1. **PrivyProvider 설정**
```typescript
import { PrivyProvider } from '@privy-io/expo-auth';

export default function App() {
  return (
    <PrivyProvider appId="YOUR_PRIVY_APP_ID">
      {/* Your app content */}
    </PrivyProvider>
  );
}
```

2. **사용자 정보 처리**
```typescript
import { usePrivy } from '@privy-io/expo-auth';

export default function Profile() {
  const { user } = usePrivy();
  return (
    <View>
      <Text>Welcome {user.email}!</Text>
    </View>
  );
}
```

3. **로그인/로그아웃 구현**
```typescript
import { usePrivy } from '@privy-io/expo-auth';

export default function Auth() {
  const { login, logout } = usePrivy();
  return (
    <View>
      <Button onPress={login} title="Login" />
      <Button onPress={logout} title="Logout" />
    </View>
  );
}
```


## 🔑 로그인 구현

### 로그인 관련 UI 컴포넌트에서 usePrivy 훅 사용
```typescript
import { usePrivy } from '@privy-io/react-native';
import { Button, View, Text } from 'react-native';

function LoginScreen() {
  const { login, user, authenticated } = usePrivy();

  if (authenticated) {
    return <Text>로그인 완료! 사용자 ID: {user?.id}</Text>;
  }

  return (
    <View>
      <Button title="로그인" onPress={() => login()} />
    </View>
  );
}
```
## ✅ 로그인 성공 시 처리 (인증 상태 처리)

- `usePrivy` 훅 사용
- `user.id` → `privy_user_id` 확보
- usePrivy 훅에서 제공하는 authenticated (boolean) 상태를 활용하여 조건부 렌더링 구현.
- status 관리

## 🔑 Supabase 연동

### 1. Supabase 클라이언트 설정

```typescript
// @supabase/supabase-js 설치
npm install @supabase/supabase-js
// Expo 환경에서는 AsyncStorage 어댑터 필요
npm install @react-native-async-storage/async-storage
```

- Supabase 클라이언트 인스턴스 생성

```typescript
import 'react-native-url-polyfill/auto'; // Supabase v2 이상에서 필요할 수 있음
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Constants from 'expo-constants'; // 환경 변수 접근 예시
```
- 혹은 설정파일 .env, Expo 설정에서 로드 권장
```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL; // 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY; // 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // React Native 환경 필수
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```
### 2. Privy 로그인 성공 후 처리
- usePrivy 훅의 user 상태 변경을 감지 (예: useEffect) 하거나, 로그인 성공 콜백 내에서 확보한 privy_user_id를 Supabase Edge Function으로 전달.

```typescript
import { supabase } from './supabaseClient'; // 위에서 생성한 클라이언트 임포트
import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-native';

function AuthHandler() {
  const { user, authenticated } = usePrivy();

  useEffect(() => {
    if (authenticated && user) {
      const handleSupabaseSync = async () => {
        try {
          // 'sync-user'는 예시 함수 이름
          const { data, error } = await supabase.functions.invoke('sync-user', {
            body: { privyUserId: user.id }
          });

          if (error) throw error;

          console.log('Supabase 동기화 성공:', data);
          // 여기서 반환된 qid 등을 앱 상태(Context, Zustand 등)에 저장
        } catch (error) {
          console.error('Supabase 동기화 오류:', error);
        }
      };
      handleSupabaseSync();
    }
  }, [authenticated, user]);

  return null; // 이 컴포넌트는 로직 처리용, UI 없음
}
```

### Supabase Edge Function 로직 (개념)
```typescript
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { privyUserId } = await req.json()

  // 환경 변수에서 Supabase 정보 로드 (프로젝트 설정 필요)
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // 서비스 키 사용 주의
  )

  // 1. privy_user_id로 기존 사용자 조회
  let { data: existingUser, error: selectError } = await supabaseClient
    .from('users')
    .select('qid, id, referral_code') // 필요한 정보만 조회
    .eq('privy_user_id', privyUserId)
    .single()

  if (selectError && selectError.code !== 'PGRST116') { // PGRST116: Row not found
    throw selectError
  }

  if (existingUser) {
    // 2. 기존 사용자 정보 반환
    return new Response(JSON.stringify(existingUser), {
      headers: { 'Content-Type': 'application/json' },
    })
  } else {
    // 3. 신규 사용자 생성
    const newQid = `qid_${crypto.randomUUID()}`; // 예시 QID 생성 로직
    const newReferralCode = `ref_${crypto.randomUUID().substring(0, 8)}`; // 예시 레퍼럴 코드 생성

    // (추가) 추천인 코드 처리 로직 (request body에서 referralCode 받아서 처리)

    const { data: newUser, error: insertError } = await supabaseClient
      .from('users')
      .insert({
        privy_user_id: privyUserId,
        qid: newQid,
        referral_code: newReferralCode,
        // referrer_user_id: ... (추천인 로직 추가 시)
      })
      .select('qid, id, referral_code')
      .single()

    if (insertError) throw insertError

    // (추가) 추천인 포인트 업데이트 로직

    return new Response(JSON.stringify(newUser), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
```
- Edge Function 개발 및 배포는 Supabase CLI 사용


## 📝 백엔드 & 데이터베이스 (Supabase)
- 백엔드 인프라는 Supabase BaaS를 활용하며, PostgreSQL 데이터베이스 및 서버리스 Edge Function 기능을 사용.

```sql
-- 사용자 정보
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- 내부 DB ID
  created_at timestamptz DEFAULT now(),
  privy_user_id text UNIQUE NOT NULL, -- Privy 사용자 ID (로그인 연동 키)
  qid text UNIQUE NOT NULL, -- Qupid 서비스 고유 사용자 ID
  username text,
  profile_picture_url text,
  linked_wallet_address text, -- 연결된 지갑 주소
  linked_email text, -- 연결된 이메일 주소
  referral_code text UNIQUE NOT NULL, -- 사용자 본인의 추천 코드
  referrer_user_id uuid REFERENCES users(id), -- 이 사용자를 추천한 사용자의 ID
  referral_points integer NOT NULL DEFAULT 0 -- 추천 활동으로 획득한 포인트
);
```
```sql
-- 캡슐 (큐레이션 콘텐츠 단위)
CREATE TABLE capsules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  creator_user_id uuid NOT NULL REFERENCES users(id), -- 캡슐 생성자 ID
  original_url text, -- 큐레이션 대상 원본 URL
  title text, -- 캡슐 제목 (메타데이터 또는 사용자 정의)
  description text, -- 캡슐 설명
  image_url text, -- 캡슐 대표 이미지 URL
  metadata_raw jsonb, -- 원본 URL에서 추출한 메타데이터 (JSON)
  curator_notes text -- 큐레이터가 추가한 노트/코멘트
);
CREATE INDEX idx_capsules_creator_user_id ON capsules(creator_user_id);
```
```sql
-- 사용자-캡슐 연결 (다-다 관계)
CREATE TABLE user_capsule_connections (
CREATE TABLE capsule_tags (
  capsule_id uuid NOT NULL REFERENCES capsules(id) ON DELETE CASCADE,
  tag_name text NOT NULL,
  PRIMARY KEY (capsule_id, tag_name)
);
CREATE INDEX idx_capsule_tags_tag_name ON capsule_tags(tag_name);
```
```sql
-- 사용자-캡슐 상호작용 (좋아요, 저장 등)
CREATE TABLE user_capsule_interactions (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  capsule_id uuid NOT NULL REFERENCES capsules(id) ON DELETE CASCADE,
  interaction_type text NOT NULL, -- 'like', 'save' 등 상호작용 유형
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, capsule_id, interaction_type)
);
```
```sql
-- Qupid 생태계 dApp 정보
CREATE TABLE q_apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL, -- dApp 이름
  description text,
  icon_url text,
  app_url text NOT NULL, -- dApp 접속 URL
  category text,
  developer_info text
  -- 기타 필요한 정보 (스크린샷, 평점 등)
);
CREATE INDEX idx_q_apps_category ON q_apps(category);
```  

## ⭐️ 핵심 기능 구현

### 회원가입 & 레퍼럴 시스템:
- 프로세스: 위 2번 항목의 Supabase Edge Function (sync-user 예시) 로직 참고. 신규 사용자 생성 시 qid, referral_code 발급 및 저장. 추천인 코드(referralCode)가 클라이언트에서 전달된 경우, 해당 코드로 추천인(referrer) 조회 후 referrer_user_id 기록 및 추천인의 referral_points 업데이트 (별도 함수 또는 트랜잭션 고려).
추천 코드 공유: React Native의 Share API (react-native 기본 제공) 활용하여 사용자의 referral_code 공유 기능 구현.
포인트 관리: 마이페이지 등에서 Supabase 클라이언트로 users 테이블의 referral_points 조회하여 표시.

### 캡슐 생성 및 관리
- URL 메타데이터 추출: 클라이언트에서 URL 입력받아 Supabase Edge Function (예: fetch-metadata) 호출. Edge Function 내에서 Deno의 fetch API와 HTML 파싱 라이브러리(예: deno-dom) 사용하여 Open Graph 태그 등 추출. 추출된 title, description, image_url, 원본 metadata_raw (JSON) 반환.
* 주의: 외부 URL fetch는 CORS, 보안 등 이슈 발생 가능성 있음. 서버(Edge Function) 처리 필수.
- 캡슐 정보 입력 UI: React Native TextInput, Image 컴포넌트 등 활용. 상태 관리 라이브러리(Context API, Zustand, Redux Toolkit 등) 사용하여 입력 데이터 관리.
- 태그 입력: 태그 입력 UI 구현 (예: 쉼표로 구분 입력, 자동완성 등). 입력된 태그는 배열 형태로 관리.
- 캡슐 저장: 최종 캡슐 데이터 (메타데이터 포함) 및 태그 배열을 Supabase 클라이언트를 통해 capsules 테이블 및 capsule_tags 테이블에 저장. creator_user_id는 현재 로그인된 사용자의 id (Supabase users 테이블 기준) 사용. 트랜잭션 처리 고려 (캡슐 저장 + 태그 저장).

### 큐레이션 활동 (좋아요/저장):
- 캡슐 상세 화면 등에서 '좋아요', '저장' 버튼 UI 구현.
- 버튼 클릭 시 Supabase 클라이언트로 user_capsule_interactions 테이블에 user_id, capsule_id, interaction_type ('like' 또는 'save') 정보 삽입/삭제 로직 구현. (RLS 정책 설정 필수)


### Qupid dApp 스토어:
- Supabase 클라이언트로 q_apps 테이블 데이터 조회.
- React Native FlatList 또는 ScrollView 컴포넌트 사용하여 목록 UI 구현. Image 컴포넌트로 icon_url 표시, Linking API (expo-linking 또는 react-native 기본 제공) 사용하여 app_url 링크 연결.

## 👩🏻‍💻 UI/UX 고려 사항
- 앱 로딩 스플래시: expo-splash-screen 라이브러리 사용하여 앱 초기 로딩 제어 및 커스텀 스플래시 화면 표시.
- 로그인 인터페이스: Privy UI Kit 참고 또는 react-native-elements, react-native-paper 등 UI 라이브러리 활용하여 커스텀 로그인 UI 구현.
- 애플리케이션 기본 구조:
  - 네비게이션: @react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/native-stack 라이브러리 조합하여 탭 네비게이션 및 스택 네비게이션 구현.
  - 상태 관리: 앱 전역 상태(로그인 상태, 사용자 정보 등) 관리를 위해 React Context API, Zustand, Redux Toolkit 등 도입 고려.
  - 데이터 페칭: react-query (TanStack Query) 또는 SWR 라이브러리 사용하여 Supabase 데이터 조회 로직의 캐싱, 로딩/에러 상태 관리 단순화 고려.
