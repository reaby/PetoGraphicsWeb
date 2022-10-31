const isImage = (file) => {
    const extensions = [
        'apng',
        'avif',
        'gif',
        'jpg',
        'jpeg',
        'jfif',
        'pjpeg',
        'pjp',
        'png',
        'svg',
        'webp',
    ];
    for (const extension of extensions) {
        if (file.endsWith(`.${extension}`)) {
            return true;
        }
    }
    return false;
};

export default isImage;
