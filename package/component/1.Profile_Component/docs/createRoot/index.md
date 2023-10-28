```javascript
function createRoot(container, options) {
  if (!isValidContainer(container)) {
    throw new Error("createRoot(...): Target container is not a DOM element.");
  }

  warnIfReactDOMContainerInDEV(container);
  var isStrictMode = false;
  var concurrentUpdatesByDefaultOverride = false;
  var identifierPrefix = "";
  var onRecoverableError = defaultOnRecoverableError;
  var transitionCallbacks = null;

  if (options !== null && options !== undefined) {
    {
      if (options.hydrate) {
        warn(
          "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
        );
      } else {
        if (
          typeof options === "object" &&
          options !== null &&
          options.$$typeof === REACT_ELEMENT_TYPE
        ) {
          error(
            "You passed a JSX element to createRoot. You probably meant to " +
              "call root.render instead. " +
              "Example usage:\n\n" +
              "  let root = createRoot(domContainer);\n" +
              "  root.render(<App />);"
          );
        }
      }
    }

    if (options.unstable_strictMode === true) {
      isStrictMode = true;
    }

    if (options.identifierPrefix !== undefined) {
      identifierPrefix = options.identifierPrefix;
    }

    if (options.onRecoverableError !== undefined) {
      onRecoverableError = options.onRecoverableError;
    }

    if (options.transitionCallbacks !== undefined) {
      transitionCallbacks = options.transitionCallbacks;
    }
  }

  var root = createContainer(
    container,
    ConcurrentRoot,
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError
  );
  markContainerAsRoot(root.current, container);
  var rootContainerElement =
    container.nodeType === COMMENT_NODE ? container.parentNode : container;
  listenToAllSupportedEvents(rootContainerElement);
  return new ReactDOMRoot(root);
}
```

1. isValidContainer(container)는 뭘까?

-

```js
function isValidContainer(node) {
  return !!(
    node &&
    (node.nodeType === ELEMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE ||
      !disableCommentsAsDOMContainers)
  );
} // TODO: Remove this function which also includes comment nodes.
// We only use it in places that are currently more relaxed.

// 주석 노드도 포함하는 이 함수를 제거하세요
// 현재 더 편안한 장소에서만 그것을 사용합니다
```

- 이게 무슨 말이지?

- nodeType?

```js
/**
 * HTML nodeType values that represent the type of the node
 * => 노드 유형을 나타내는 HTML nodeType값
 */
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
```

- 일단 중간은 스킵

- createContainer?

```js
// line 28740
function createContainer(
  containerInfo,
  tag,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride,
  identifierPrefix,
  onRecoverableError,
  transitionCallbacks
) {
  var hydrate = false;
  var initialChildren = null;
  return createFiberRoot(
    containerInfo,
    tag,
    hydrate,
    initialChildren,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError
  );
}
```

- createContainer에서 createFiberRoot를 매개변수와 같이 호출하는 것을 볼 수 있음

- createFiberRoot 구조는?

```js
function createFiberRoot(
  containerInfo,
  tag,
  hydrate,
  initialChildren,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride, // TODO: We have several of these arguments that are conceptually part of the
  // host config, but because they are passed in at runtime, we have to thread
  // them through the root constructor. Perhaps we should put them all into a
  // single type, like a DynamicHostConfig that is defined by the renderer.

  // TODO: 개념적으로 호스트 구성의 일부인 이러한 인수 중 몇 개가 있지만, 런타임에 전달되기 때문에 루트 생성자를 통해 스레드해야 함
  // 아마도 렌더러가 정의한 DynamicHostConfig와 같은 단일 타입에 모두 넣어야 할 것
  identifierPrefix,
  onRecoverableError,
  transitionCallbacks
) {
  var root = new FiberRootNode(
    containerInfo,
    tag,
    hydrate,
    identifierPrefix,
    onRecoverableError
  );
  // stateNode is any.

  var uninitializedFiber = createHostRootFiber(tag, isStrictMode);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  {
    var _initialState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: null,
      // not enabled yet
      transitions: null,
      pendingSuspenseBoundaries: null,
    };
    uninitializedFiber.memoizedState = _initialState;
  }

  initializeUpdateQueue(uninitializedFiber);
  return root;
}
```

- function FiberRootNode의 구조는 어떻게 될까?

```js
function FiberRootNode(
  containerInfo,
  tag,
  hydrate,
  identifierPrefix,
  onRecoverableError
) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.callbackNode = null;
  this.callbackPriority = NoLane;
  this.eventTimes = createLaneMap(NoLanes);
  this.expirationTimes = createLaneMap(NoTimestamp);
  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;
  this.entangledLanes = NoLanes;
  this.entanglements = createLaneMap(NoLanes);
  this.identifierPrefix = identifierPrefix;
  this.onRecoverableError = onRecoverableError;

  {
    this.mutableSourceEagerHydrationData = null;
  }

  {
    this.effectDuration = 0;
    this.passiveEffectDuration = 0;
  }

  {
    this.memoizedUpdaters = new Set();
    var pendingUpdatersLaneMap = (this.pendingUpdatersLaneMap = []);

    for (var _i = 0; _i < TotalLanes; _i++) {
      pendingUpdatersLaneMap.push(new Set());
    }
  }

  {
    switch (tag) {
      case ConcurrentRoot:
        this._debugRootType = hydrate ? "hydrateRoot()" : "createRoot()";
        break;

      case LegacyRoot:
        this._debugRootType = hydrate ? "hydrate()" : "render()";
        break;
    }
  }
}
```
