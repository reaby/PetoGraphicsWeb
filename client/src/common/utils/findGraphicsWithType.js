const findGraphicsWithType = (config, type) => {
    let graphicsWithType = [];
    for (const graphic of config) {
        if (graphic.type === type) {
            graphicsWithType.push(graphic);
        }
        const children = findGraphicsWithType(graphic.children, type);
        graphicsWithType = [...graphicsWithType, ...children];
    }
    return graphicsWithType;
};

export default findGraphicsWithType;
