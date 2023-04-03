export function allSiblings(elem) {
    let result = [],
        node = elem.parentNode.firstChild;

    while ( node ) {
        if ( node !== elem && node.nodeType === Node.ELEMENT_NODE )
            result.push( node );
        node = node.nextElementSibling || node.nextSibling;
    }

    return result;
}
