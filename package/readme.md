https://angularindepth.com/posts/1006/practical-application-of-reverse-engineering-guidelines-and-principles

- React

  - 소스 획득 및 샘플 애플리케이션 부터 시작

- https://github.com/facebook/react/releases/tag/v18.2.0

  - react 18.2.0

- git tag

- 코드 및 동일한 버전의 리액트로 설정해야 함

- 집중해야 할 부분은?

  - 리버스 엔지니어링의 시작 위치는?

  - 1. 리액트에서 변경 감지가 어떻게 작동하는가?

- 최신 변경 감지 프로세스에 대한 지식을 활용할 수 있는가?

  - 여전히 디버거를 어디다?, 소스에서 어떤 파일을 찾아야 하는지 알려주지 않음

- 일반적인 디자인 패턴과 아키텍처 개념을 알아보세요

  - 변경 감지를 = React.setState를 호출해 변경 감지 프로세스를 시작

  - 문서에서 비동기 호출이라는 것을 배웠기 때문에, 관련 부분으로 직접 연결되지는 않을 것 같음

  - 그래서! 대신 React가 생성된 DOM 노드에 대한 참조를 저장하는 위치를 식별하는 데, 중점을 둘 것

    - 이를 알게 되면, 이러한 DOM 노드에 접근하는 위치를 추적하고 거기에서 작업을 진행할 수 있을 것 같음

===

- 찾아야 할 DOM 노드

  - DOM 노드가 저장되는 위치를 파악하려면 먼저 구성 요소에 대해 어떤 DOM 노드가 생성되는지 알아야 함

=== 
- 나의 생각: 함수형으로 표현을 주로 하니까, 그거의 샘플코드부터 시작해보자

  - https://react.dev/learn/your-first-component

https://react.dev/learn/your-first-component#defining-a-component

```
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```



=== 


```react
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }
  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
```

- 구성 요소에 대한 템플릿 반환을 담당하는 렌더링 함수를 보고 있음

- 여기서 e는 React.createElement의 별칭

```
const e = React.createElement;
```

- Angular에서는 구성 요소의 템플릿이 HTML을 사용하여 정의됨

  - 그러나 React에서 템플릿은 createElement 함수에 대한 호출을 구성하여 정의됨

  - 따라서 다음 명령문에 의해 어떤 HTML이 생성되는지 파악해야 함

```
return e(
    'button',
    {onClick: () => this.setState({liked: true})},
    'Like'
);
```

- createElement 함수에 대한 호출

  - 함수 구현을 탐색할 수 있음, 하지만 먼저 소스에서 해당 기능을 찾아야 함

  - 이를 위해, 소스에서 IDE Search EveryWhere 기능을 사용

- react-dom 패키지 함수에 대한 서명

```
export function createElement(
  type: string,
  props: Object,
  rootContainerElement: Element | Document,
  parentNamespace: string,
): Element { ... }
```

- react 패키지 함수에 대한 서명은 다음과 같음 

```
export function createElement(type, config, children) { ... }

```

- 어느 것이 필요한가요?

  - 과학자처럼 생각하라?

1. 관찰하고 가설을 세우자

2. 가설을 바탕으로 예측을 해보자 

3. 예측을 테스트합니다

