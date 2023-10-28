- react/blob/main/packages/react-reconciler/src/ReactInternalTypes.js

  - Fiber는 수행되어야 하거나 수행된 구성 요소에 대한 작업입니다. 구성 요소당 둘 이상이 있을 수 있습니다.

```js
// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
// Fiber는 수행되어야 하거나 수행된 구성 요소에 대한 작업입니다. 구성 요소당 둘 이상이 있을 수 있습니다.

export type Fiber = {
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.

  // 첫 번째 필드는 개념적으로 인스턴스의 멤버입니다. 이는 별도의 타입으로 분할되어 다른 Fiber 필드와 교차되었지만, Flow가 교차 버그를 수정할 때까지 이를 단일 타입으로 병합함

  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.

  // 인스턴스는 모든 버전의 구성 요소 간에 공유됩니다. 트리의 대체 버전에 너무 많은 내용이 복사되는 것을 피하기 위해 이를 별도의 객체로 쉽게 나눌 수 있습니다. 지금은 초기 렌더링 중에 생성되는 객체 수를 최소화하기 위해 이를 단일 객체에 배치합니다.

  // Tag identifying the type of fiber.

  // fiber 타입을 식별하는 태그입니다.
  tag: WorkTag,

  // Unique identifier of this child.

  // 이 자녀의 고유 식별자입니다.
  key: null | string,

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.

  // 이 하위 항목을 조정하는 동안 ID를 유지하는 데 사용되는 element.type의 값입니다.
  elementType: any,

  // The resolved function/class/ associated with this fiber.

  // 이 Fiber와 관련된 해결된 기능/클래스/ 입니다.
  type: any,

  // The local state associated with this fiber.

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

// line : 133부터 다시

```




```js

```
