```js
function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, // TODO: 개념적으로 호스트 구성의 일부인 이러한 인수 중 몇 개가 있지만, 런타임에 전달되기 때문에, 루트 생성자를 통해 스레드해야 합니다. 아마도 렌더러가 정의한 DynamicHostConfig와 같은 단일 유형에 모두 넣어야 할 것입니다.
identifierPrefix, onRecoverableError, transitionCallbacks) {
var root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError);
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
        pendingSuspenseBoundaries: null
      };
      uninitializedFiber.memoizedState = _initialState;
    }

    initializeUpdateQueue(uninitializedFiber);
    return root;

}
```