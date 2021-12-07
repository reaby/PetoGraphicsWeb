const getVideoDuration = (url) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve(video.duration);
        video.onerror = (error) => reject(error);
        video.src = url;
    });
};

export default getVideoDuration;
