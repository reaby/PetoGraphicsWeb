const getBackendUrl = () => {
    return 'http://' + window.location.host.split(':')[0] + ':5000';
};

export default getBackendUrl;
