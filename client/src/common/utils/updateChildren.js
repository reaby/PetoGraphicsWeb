import _set from 'lodash/set';

const updateChildren = (children, path, value) => {
    for (const child of children) {
        _set(child, path, value);
        updateChildren(child.children, path, value);
    }
};

export default updateChildren;
