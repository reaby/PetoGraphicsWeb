import _cloneDeep from 'lodash/cloneDeep';

const copyGraphic = (graphic) => {
    const copy = _cloneDeep(graphic);
    generateIds(copy);
    return copy;
};

const generateIds = (graphic) => {
    graphic.id = crypto.randomUUID();
    for (const child of graphic.children) {
        generateIds(child);
    }
};

export default copyGraphic;
