const isVideo = (file) => {
    const extensions = ['ogg', 'webm', 'mp4'];
    for (const extension of extensions) {
        if (file.endsWith(`.${extension}`)) {
            return true;
        }
    }
    return false;
};

export default isVideo;
