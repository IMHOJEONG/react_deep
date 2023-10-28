### umd에서는 react-dom 패키지를 어떻게 표현했을까?

- 가설

```javascript
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Profile />);
```

- 단 위의 3줄만으로 react 코드를 실행할 수 있다는 신가한 부분

```javascript
const root = ReactDOM.createRoot(container);
// const root = ReactDOMClient.createRoot(container);
```

- 왜 이부분은 umd에서는 ReactDOMClient가 아닌 ReactDOM으로만 실행될까?

- 하나씩 PR 및 이슈들을 읽어가며 찾아보자

1. Dan 님이 이 부분을 bug라고 얘기해주심

- https://github.com/facebook/react/issues/24221

- commit 변경 사항을 보면

  - https://github.com/facebook/react/pull/24274/files

```javascript
//if (!Internals.usingClientEntryPoint) {
if (!Internals.usingClientEntryPoint && !__UMD__) {
```

- 위처럼 &&가 추가되는 부분만 존재합니다.

  - packages/react-dom/src/client/ReactDOM.js 코드의 일부분의 변경사항이었음

- react-dom@18.0.0 버전에서는

```text
react-dom.development.js:73 Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
```

와 같은 문제가 계속 발생

- react-dom@18.1.0 부터는 발생하지 않음
