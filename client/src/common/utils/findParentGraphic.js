const findParentGraphic = (config, id, parent = null) => {
    for (const graphic of config) {
        if (graphic.id === id) {
            return parent;
        }
        const foundParent = findParentGraphic(graphic.children, id, graphic);
        if (foundParent) {
            return foundParent;
        }
    }
    return null;
};

export default findParentGraphic;
