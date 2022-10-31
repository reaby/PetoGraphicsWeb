const fetchWrap = (url, options) => {
    return fetch(url, options).then((response) => {
        // Treat any HTTP error as an error
        if (!response.ok) {
            throw response.text();
        }
        return response;
    });
};

export default fetchWrap;
