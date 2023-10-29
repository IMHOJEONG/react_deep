- react/blob/main/packages/react-reconciler/src/ReactInternalTypes.js

  - Fiber는 수행되어야 하거나 수행된 구성 요소에 대한 작업입니다. 구성 요소당 둘 이상이 있을 수 있습니다.

```js
// Fiber는 수행되어야 하거나 수행된 구성 요소에 대한 작업입니다. 구성 요소당 둘 이상이 있을 수 있습니다.

export type Fiber = {
  // 첫 번째 필드는 개념적으로 인스턴스의 멤버입니다. 이는 별도의 타입으로 분할되어 다른 Fiber 필드와 교차되었지만, Flow가 교차 버그를 수정할 때까지 이를 단일 타입으로 병합함

  // 인스턴스는 모든 버전의 구성 요소 간에 공유됩니다. 트리의 대체 버전에 너무 많은 내용이 복사되는 것을 피하기 위해 이를 별도의 객체로 쉽게 나눌 수 있습니다. 지금은 초기 렌더링 중에 생성되는 객체 수를 최소화하기 위해 이를 단일 객체에 배치합니다.

  // fiber 타입을 식별하는 태그입니다.
  tag: WorkTag,

  // 이 자녀의 고유 식별자입니다.
  key: null | string,

  // 이 하위 항목을 조정하는 동안 ID를 유지하는 데 사용되는 element.type의 값입니다.
  elementType: any,

  // 이 Fiber와 관련된 해결된 기능/클래스/ 입니다.
  type: any,

  // 이 fiber와 관련된 로컬 상태입니다.
  stateNode: any,

  // 개념적 별칭

    // parent: 인스턴스 -> Fiber와 인스턴스를 병합했기 때문에, 부모는 반환 Fiber와 동일하게 됩니다.

  // 나머지 필드는 Fiber에 속함

    // 이 처리를 마친 후 돌아갈 Fiber입니다.

    // 이는 사실상 부모이지만 여러 부모가 있을 수 있습니다(2개)

    // => 현재 처리 중인 항목의 부모일 뿐

    // 개념적으로는 스택 프레임의 반환 주소와 동일
  return: Fiber | null,

  // 단일 연결 링크드 리스트 트리 구조
child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // 이 노드를 연결하는데 마지막으로 사용된 참조
  // prod 및 model에 대한 소유자 필드를 함수로 추가하지 않겠습니다.

   ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject,

    refCleanup: null | (() => void),

    // input은 이 fiber를 처리하는 데 들어오는 데이터입니다. 인수 또는 props
    pendingProps: any, // 이 타입은 태그를 오버로드하면 더욱 구체적인 표현이 됩니다.
    memoizedProps: any, // 출력을 생성하는 데 사용되는 props.

    // 이 Fiber에 대한 종속성(컨텍스트, 이벤트)이 있는 경우
    dependencies: Dependencies | null,


     // 파이버 및 해당 하위 트리에 대한 속성을 설명하는 비트 필드입니다.
     // 예: ConcurrentMode 플래그는 하위 트리가 기본적으로 비동기이어야 하는지 여부를 나타냅니다. 파이버가 생성되면, 상위 파이버의 모드를 상속합니다. 생성시 추가 플래그를 설정할 수 있지만, 그 이후에는 파이버의 수명 동안, 특히 하위 파이버가 생성되지 전에 값이 변경되지 않은 상태로 유지되어야 합니다.
    mode: TypeOfMode,

    // Effect (이팩트))
  flags: Flags,
  subtreeFlags: Flags,
  deletions: Array<Fiber> | null,

  // 부수 효과가 있는 다음 파이버로의 단일 연결 목록의 빠른 경로입니다.
  nextEffect: Fiber | null,


  // 이 하위 트리 내에서 부수효과가 있는 첫 번째 및 마지막 파이버입니다. 이를 통해 이 파이버 내에서 수행된 작업을 재사용할 때 연결 목록의 일부를 재사용할 수 있습니다.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  lanes: Lanes,
  childLanes: Lanes,

  // 이것은 Fiber의 풀링된 버전입니다. 업데이트되는 모든 파이버는 결국 쌍을 갖게 됩니다. 필요한 경우 메모리를 절약하기 위해 쌍을 정리할 수 있는 경우가 있습니다.
  alternate: Fiber | null,




```
