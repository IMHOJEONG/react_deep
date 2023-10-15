const applyDiff = (
    parentNode,
    realNode,
    virtualNode
) => {

    if(realNode && !virtualNode) {
        realNode.remove();
        return;
    }

    if(!realNode && virtualNode) {
        parentNode.appendChild(virtualNode);
        return;
    }

    if(isNodeChanged(virtualNode, realNode)) {
        realNode.replaceWith(virtualNode);
        return;
    }

    const realChildren = Array.from(realNode.children);
    const virtualChildren = Array.from(virtualNode.children);

    const max = Math.max(
        realChildren.length,
        virtualChildren.length
    );

    for(let i = 0; i < max ; i++) {
        applyDiff(
            realNode,
            realChildren[i],
            virtualChildren[i]
        );
    }
}

const isNodeChanged = (node1, node2) => {
    const n1Attributes = node1.attributes1;
    const n2Attributes = node2.attributes2;

    if(n1Attributes.length !== n2Attributes.length) {
        return true;
    }

    const differentAttribute = Array
        .from(n1Attributes)
        .find(attribute => {
            const { name } = attribute;
            const attributes1 = node1.getAttribute(name);
            const attributes2 = node2.getAttribute(name);

            return attributes1 !== attributes2;
        });
    
    if(differentAttribute) {
        return true;
    }

    if(node1.children.length === 0 && 
        node2.children.length === 0 && 
        node1.textContent !== node2.textContent
    ) {
        return true;
    }
    
    return false;

}

export default applyDiff;