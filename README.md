# 깃 설치

## 윈도우 설치

[https://git-scm.com/download/win](https://git-scm.com/download/win)

## MAC 설치

[https://git-scm.com/download/mac](https://git-scm.com/download/mac)

# 설치 사용법

## 소스코드 다운로드

```
git clone https://github.com/jeongjuwon/koreauniv.crimson.git
```

## 앱 실행 방법

```
cd CrimsonProject
npm install <= 처음 다운로드 받거나 package.json에 변경 사항이 있을 때
npx pod-install <= 처음 다운로드 받거나 package.json에 변경 사항이 있을 때
npx react-native run-ios
npx react-native run-android
```

## 서버 실행 방법

```
cd CrimsonServer
npm install <= 처음 다운로드 받거나 package.json에 변경 사항이 있을 때
DEBUG=crimsonserver:* npm start
```
