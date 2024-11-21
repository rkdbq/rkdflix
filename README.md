# [rkdflix](https://rkdbq.github.io/rkdflix/)

## 프로젝트 개요
rkdflix는 영화 정보를 제공하고 사용자가 영화를 검색하고 위시리스트에 추가할 수 있는 Vue.js 기반 웹 애플리케이션입니다.

## 프로젝트 기술 스택
- Vue.js 3
- Vue Router
- Vuex
- Axios
- FontAwesome
- TMDB API

## 프로젝트 구조
```
rkdflix/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── etc/
│   │   │   ├── Filter.vue
│   │   │   ├── Loading.vue
│   │   │   ├── RkdButton.vue
│   │   ├── movie/
│   │   │   ├── MovieBanner.vue
│   │   │   ├── MovieGrid.vue
│   │   │   ├── MovieItem.vue
│   │   │   ├── MovieScrollView.vue
│   │   │   ├── MovieSliderView.vue
│   │   │   ├── MovieTableView.vue
│   │   ├── sign-in/
│   │   │   ├── **SignIn.vue**
│   │   │   ├── UserInput.vue
│   │   ├── **Home.vue**
│   │   ├── **Popular.vue**
│   │   ├── **Search.vue**
│   │   ├── **Wishlist.vue**
│   ├── **App.vue**
│   ├── main.js
├── package.json
├── README.md
```

## 실행 방법

### 프로젝트 설정
```
npm install
```

### 개발 서버 실행 및 핫 리로드
```
npm run serve
```

### 프로덕션 빌드
```
npm run build
```
