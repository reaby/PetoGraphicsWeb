const findGraphic = (config, id) => {
    for (const graphic of config) {
        if (graphic.id === id) {
            return graphic;
        }
        const child = findGraphic(graphic.children, id);
        if (child) {
            return child;
        }
    }
    return null;
};

export default findGraphic;
